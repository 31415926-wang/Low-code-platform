import request from '@/utils/request'
import { PageParams } from '@/type/api/index'
import { WorkListResult } from '@/type/api/work'

enum URL {
    GetWorks = '/api/works'
}

export const reqWorks = (params: PageParams) => {
    return request<WorkListResult>({
        url: URL.GetWorks,
        method: 'get',
        params
    })
}
