import { GlobalConfig } from "@/types/config";
import { getAppEnvConfig } from "@/utils/env";
import { warn } from "@/utils/log";

export const useGlobSetting = (): Readonly<GlobalConfig> => {
  const {
    VITE_BLOG_API_URL,
    VITE_BLOG_API_URL_PREFIX,
    VITE_BLOG_APP_SHORT_NAME,
    VITE_BLOG_APP_TITLE,
    VITE_BLOG_UPLOAD_URL,
  } = getAppEnvConfig();

  if (!/[a-zA-Z]\_]*/.test(VITE_BLOG_APP_SHORT_NAME)) {
    warn("VITE_BLOG_APP_SHORT_NAME 只能使用字符串和下划线");
  }

  const glob: Readonly<GlobalConfig> = {
    title: VITE_BLOG_APP_TITLE,
    apiUrl: VITE_BLOG_API_URL,
    shortName: VITE_BLOG_APP_SHORT_NAME,
    urlPrefix: VITE_BLOG_API_URL_PREFIX,
    uploadUrl: VITE_BLOG_UPLOAD_URL,
  };

  return glob as Readonly<GlobalConfig>;
};
