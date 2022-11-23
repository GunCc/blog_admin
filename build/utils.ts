/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-17 15:32:25
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 15:37:40
 * @FilePath: \blog_admin\build\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function wrapperEnv(envConf: Recordable): ViteEnv {
    const ret: any = {};
    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n')
        realName = realName === 'true' ? true : realName === "false" ? false : realName;

        if (envName === "VITE_PORT") {
            realName = Number(realName)
        }
        if (envName === "VITE_PROXY" && realName) {
            try {
                realName = JSON.parse(realName.replace(/'/g, '"'));
            } catch (error) {
                realName = ';'
            }
        }
        ret[envName] = realName;
        if (typeof realName === 'string') {
            process.env[envName] = realName
        } else if (typeof realName === 'object') {
            process.env[envName] = JSON.stringify(realName)
        }
    }
    return ret
}