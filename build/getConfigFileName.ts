/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 16:52:42
 * @FilePath: \blog_admin\build\getConfigFileName.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 获取系统被指文件名  Record 定义 key 和 value 的类型
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION_${env.VITE_BLOG_APP_SHORT_NAME || "__APP"}__CONF__`
    .toUpperCase()
    .replace(/\s/g, "");
};
