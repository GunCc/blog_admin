/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-11-13 16:39:59
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-17 17:45:13
 * @FilePath: \blog_admin\src\components\Page\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { withInstall } from "/@/utils";

import pageFooter from "./src/PageFooter.vue"
import pageWrapper from "./src/PageWrapper.vue"


export const PageFooter = withInstall(pageFooter)
export const PageWrapper = withInstall(pageWrapper)

export const PageWrapperFixedHeightKey = 'PageWrapperFixedHeight';
