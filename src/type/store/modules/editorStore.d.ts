import type { widgetData, PageDate, historyRecord, commonProps } from '../.././widgets/index'

export interface editorState {
    // 编辑器已添加的组件/物料列表
    components: widgetData[],
    // 选中的物料组件
    currentComponent: string,
    // 复制选中的物料
    copiedComponent: widgetData | null,
    // 历史记录相关的内容
    history: {
        index: number, // 当前游标位置
        historyRecords: historyRecord[],
        maxLength: number
    },
    // 页面的全局配置
    page: PageDate,
    // 中间变量
    cacheValue: any
}
