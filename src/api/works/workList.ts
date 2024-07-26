import request from '@/utils/request'
import { PageParams } from '@/type/api/index'
import { WorkListResult, DetailTemplateOrWork } from '@/type/api/work'

enum Url {
    GetWorks = '/api/works',
    DetailTemplates = '/api/templates',
}

// 作品、模版、回收站列表
export const reqWorks = (params: PageParams) => {
    return request<WorkListResult>({
        url: Url.GetWorks,
        method: 'get',
        params
    })
}

// 模版详细，未公开的模版用不了
export const reqDetailTemplate = (id: number) => {
    return request<DetailTemplateOrWork>({
        url: Url.DetailTemplates + '/' + id,
        method: 'get'
    })
}
