import { generateColor, getThemeColors } from "../../../build/config/themeConfig";
import { replaceStyleVariables } from "vite-plugin-theme/es/client"
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme/es/colorUtils';

/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-16 21:07:00
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-16 21:29:30
 * @FilePath: \blog_admin\src\logics\theme\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export async function changeTheme(color: string) {
    const colors = generateColor({
        mixDarken,
        mixLighten,
        tinycolor,
        color,
    })
    return await replaceStyleVariables({
        colorVariables: [...getThemeColors(color), ...colors]
    })
}