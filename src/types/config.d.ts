// 暂定两种语言
export type LocaleType = "zh_CN" | "en";

export interface GlobEnvConfig {
  // 网址标题
  VITE_BLOG_APP_TITLE: string;
  // 服务器地址
  VITE_BLOG_API_URL: string;
  // 服务器前缀
  VITE_BLOG_API_URL_PREFIX?: string;
  // 项目缩写
  VITE_BLOG_APP_SHORT_NAME: string;
  // 下载地址
  VITE_BLOG_UPLOAD_URL?: string;
}

// GlobEnvConfig 变量映射
export interface GlobalConfig {
  title: string;
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}

//语言包管理
export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}
