import { ListResult } from './index'
import { UserInfo } from './user'

export interface WorkItem {
    author: string,
    copiedCount: number,
    createdAt: string,
    desc: string,
    id: number,
    title: string,
    coverImg: string,
    isHot?: boolean,
    isPublish?: boolean,
    user: Pick<UserInfo, 'nickName' | 'username' | 'picture'>
}

export type WorkListResult = ListResult<WorkItem>
