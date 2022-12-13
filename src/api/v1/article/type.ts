// 文章分类

import { ArticleListItemModal, TypeParams } from "./model/type"
import { http } from "/@/utils/http/axios"

enum Api {
    List = '/article/type/list'
}

export const getTypeList = (params: TypeParams) =>
    http.get<ArticleListItemModal>({
        url: Api.List,
        params,
        headers: {
            // @ts-ignore
            ignoreCancelToken: true,
        }
    })