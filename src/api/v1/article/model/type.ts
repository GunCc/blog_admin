// 文章 -- 接口

import { BasicFetchResult, BasicPageParams, GlobalModal } from "../../model/baseModel";

export type TypeParams = BasicPageParams

export interface TypeListItem extends GlobalModal {
    id: number,
    title: string,
    icon: string,
}

export type ArticleListItemModal = BasicFetchResult<TypeListItem>