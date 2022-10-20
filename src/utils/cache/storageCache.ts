import { cacheCipher } from "@/settings/encryptionSetting";
import { AesEncryption, EncryptionParams } from "@/utils/cipher";
import { isNullOrUnDef } from "../is";

export interface createStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

// 创建缓存 Partial 的意思是将所有属性都变成可选
export const createStorage = ({
  // 前缀
  prefixKey = "",
  // 缓存类型
  storage = sessionStorage,
  // key 加密
  key = cacheCipher.key,
  // value 加密
  iv = cacheCipher.iv,
  // 过期时间
  timeout = null,
  // 是否加密
  hasEncrypt = true,
}: Partial<createStorageParams>) => {
  // 如果加密 但是 key 和 iv 的长度不够16 直接抛出异常
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error("When hasEncrypt is true, the key or iv must be 16 bits.");
  }

  const encryption = new AesEncryption({ key, iv });

  // Web缓存
  const WebStorage = class WebStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    // 获取 key 名称
    private getKey(key: string): string {
      // 前准 + key
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * @author Mango
     * @func Set Cache
     * @key string 密钥
     * @value any 数值
     * @expire 有效期
     */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire)
          ? new Date().getTime() + expire * 1000
          : null,
      });
      // 是否加密
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     * @author Mango
     * @func Get Cache
     * @key string 密钥
     * @def any 是否有效
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));
      if (!val) return def;
      try {
        const decVal = this.hasEncrypt
          ? this.encryption.decryptByAES(val)
          : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        // 如果存在就返回
        if (isNullOrUnDef(expire) || expire >= new Date().getTime() + expire) {
          return value;
        }
        // 不存在就删除
        this.remove(key);
      } catch (error) {
        return def;
      }
    }

    /**
     * @author Mango
     * @func Remove Cache
     * @key string 密钥
     */
    remove(key: string): void {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * @author 张梓康
     * @func Clear Storage
     */
    clear() {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
