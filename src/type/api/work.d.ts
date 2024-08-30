import { ListResult } from './index'
import { UserInfo } from './user'
import { widgetData, commonProps } from 'question-star-bricks'

// 列表中的单个模版/作品
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
    loadingStatus?: boolean,
    user: Pick<UserInfo, 'nickName' | 'username' | 'picture'>
}

export type WorkListResult = ListResult<WorkItem>

// 作品/模版的内容结构
export type ContextData = {
    components: widgetData[],
    props: Partial<commonProps>,
    setting?: any
}

// 创建、更新作品的参数
export type CreateOrSaveWorkDate = {
    coverImg: string,
    desc: string,
    title: string,
    content?: ContextData; // 组件详细
}

// 作品、模版的详细数据
export interface DetailTemplateOrWork {
    author: string;
    channels: any[]; // 渠道
    content?: ContextData; // 组件详细
    copiedCount: number;
    coverImg: string;
    createdAt: string;
    desc: string;
    id: number;
    isHot?: boolean;
    isPublic?: boolean;
    isTemplate?: boolean;
    latestPublishAt?: string;
    status: number;
    title: string;
    updatedAt: string;
    user: string;
    uuid: string;
    __v: number;
    _id: string;
}
