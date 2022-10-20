/**
 * @description: Is development
 */

import { GlobEnvConfig } from "@/types/config";
// import { getConfigFileName } from "build/getConfigFileName";

export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION_${env.VITE_BLOG_APP_SHORT_NAME || "__APP__CONF__"}`
    .toUpperCase()
    .replace(/\s/g, "");
};

// 获取普通缓存前缀
export function getCommonStoragePrefix() {
  const { VITE_BLOG_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_BLOG_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

/**
 * @func 生成密钥前缀名
 */

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}`;
}

// 获取项目配置
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);
  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_BLOG_API_URL,
    VITE_BLOG_APP_SHORT_NAME,
    VITE_BLOG_APP_TITLE,
    VITE_BLOG_API_URL_PREFIX,
    VITE_BLOG_UPLOAD_URL,
  } = ENV;

  if (!/^a-zA-Z\_*$/.test(VITE_BLOG_APP_SHORT_NAME)) {
    console.warn("VITE_BLOG_APP_SHORT_NAME 只能是字符和_");
  }

  return {
    VITE_BLOG_API_URL,
    VITE_BLOG_APP_SHORT_NAME,
    VITE_BLOG_APP_TITLE,
    VITE_BLOG_API_URL_PREFIX,
    VITE_BLOG_UPLOAD_URL,
  };
}

// 获取当前环境
export function getEnv(): string {
  return import.meta.env.MODE;
}
