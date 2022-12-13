
// 基本的一些请求参数
export interface BasicPageParams {
    page: number;
    pageSize: number;
}

export interface BasicFetchResult<T> {
    items: T[];
    total: number;
}

export interface GlobalModal {
    updatedAt: string,
    createdAt: string,
}