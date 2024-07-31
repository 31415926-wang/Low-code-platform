import request from '@/utils/request'
import { CreateOrSaveWorkDate, DetailTemplateOrWork } from '@/type/api/work'

enum Url {
    RecycleWork = '/api/works/put-back',
    CopyWork = '/api/works/copy',
    DonateWork = 'api/works/put-back/',
    BaseWork = '/api/works',
    PublishWork = '/api/works/publish'
}

// 复制
export const reqCopyWork = (id: number) => {
    return request({
        url: Url.CopyWork + '/' + id,
        method: 'post'
    })
}

// 删除
export const reqDeleteWork = (id: number) => {
    return request({
        url: Url.BaseWork + '/' + id,
        method: 'DELETE'
    })
}

// 转赠
export const reqDonateWork = () => {
    return request({
        url: Url.DonateWork,
        method: 'post'
    })
}

// 回收
export const reqRecycleWork = (id: number) => {
    return request({
        url: Url.RecycleWork + '/' + id,
        method: 'get'
    })
}

// 创建作品
export const reqCreateWork = (data: CreateOrSaveWorkDate) => {
    return request<DetailTemplateOrWork>({
        url: Url.BaseWork,
        method: 'post',
        data
    })
}

// 作品详细
export const reqDetailWork = (id: number) => {
    return request<DetailTemplateOrWork>({
        url: Url.BaseWork + '/' + id,
        method: 'get'
    })
}

// 作品保存更新
export const reqSaveWork = (id: number, data: CreateOrSaveWorkDate) => {
    return request<DetailTemplateOrWork>({
        url: Url.BaseWork + '/' + id,
        method: 'PATCH',
        data
    })
}

// 发布作品
export const reqPublishWork = (id: number) => {
    return request({
        url: Url.PublishWork + '/' + id,
        method: 'post'
    })
}
