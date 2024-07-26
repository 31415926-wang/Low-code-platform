export interface PageParams {
    pageIndex: number,
    pageSize: number,
    isTemplate?: number,
    status?: number
}

export interface ListResult<T> {
    count: number
    list: T[],
    pageIndex: number
    pageSize: number
}
