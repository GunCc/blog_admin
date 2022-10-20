import ECB from "crypto-js/mode-ecb";
import pkcs7 from "crypto-js/pad-pkcs7";
import { encrypt, decrypt } from "crypto-js/aes";
import { parse } from "crypto-js/enc-utf8";
import UTF8 from "crypto-js/enc-utf8";

export interface EncryptionParams {
  key: string;
  iv: string;
}

// 密钥类
export class AesEncryption {
  private key;
  private iv;
  // 构造函数
  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key = "123", iv } = opt;
    this.key = parse(key);
    if (iv) this.iv = parse(iv);
  }

  // 获取选项
  get getOptions() {
    return {
      // 加密模式
      mode: ECB,
      padding: pkcs7,
      iv: this.iv,
    };
  }

  // 加密 cipherText 加密内容
  encryptByAES(cipherText: string) {
    return encrypt(cipherText, this.key, this.getOptions).toString();
  }

  // 解密
  decryptByAES(cipherText: string) {
    return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
  }
}
