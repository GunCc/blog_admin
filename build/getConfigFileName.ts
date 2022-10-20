// 获取系统被指文件名  Record 定义 key 和 value 的类型
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION_${env.VITE_BLOG_APP_SHORT_NAME || "__APP__CONF__"}`
    .toUpperCase()
    .replace(/\s/g, "");
};
