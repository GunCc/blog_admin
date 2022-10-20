import { isDevMode } from "@/utils/env";

// 加密配置文件
export const cacheCipher = {
  key: "123456",
  iv: "456789",
};

// 缓存过期时间。设置为一个星期
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;


// 是否为开发环境
export const enableStorageEncryption = !isDevMode();