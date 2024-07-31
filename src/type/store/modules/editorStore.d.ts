import type {
    widgetData, PageDate, historyRecord,
    AllWidgetProps, operatePropsLevel
} from '../.././widgets/index'

export interface editorState {
    // 编辑器已添加的组件/物料列表
    components: widgetData[],
    // 选中的物料组件
    currentComponent: string,
    // 复制选中的物料
    copiedComponent: widgetData | null,
    // 是否开启网格
    openGridLine: boolean,
    // 历史记录相关的内容
    history: {
        index: number, // 当前游标位置
        historyRecords: historyRecord[],
        maxLength: number
    },
    // 页面的全局配置
    page: PageDate,
    // 中间变量
    cacheValue: any,
    // 用于保存后的作品数据，以对比当前作品是否没有保存
    cacheSaveDate?: {
        components?: widgetData[],
        page?: PageDate
    }
}

// 方法的参数
interface updateWidgetParam {
    changeKey: keyof AllWidgetProps | keyof widgetData | keyof AllWidgetProps[],
    changeValue: any,
    changeType?: operatePropsLevel,
    widgetId: string,
    noRecord?: boolean // 如果是历史记录的前进、后退操作的仓库，不加入记录
}
interface addWidgetParam {
    widgetData: widgetData,
    widgetIndex?: number, // 指定插入的位置
    entireWidget?: boolean, // 完整插入物料属性
    noRecord?: boolean
}
interface deleteWidgetParam {
    deleteIndex?: number,
    noRecord?: boolean
}
interface SetListParams {
    newlist: widgetData[]
    noRecord?: boolean
}
