import type {
    AllWidgetProps
} from '../.././widgets/index'

// 单个完整物料的数据结构
export declare interface widgetData {
    // 物料添加到编辑区的唯一id
    id?: string,
    // 对应业务(物料)组件库的组件名称
    name: WidgetName,
    // 元素的属性
    props: Partial<AllWidgetProps>,
    // 公用物料图标
    icon?: string,
    title: string,
    // 图层名称
    layerName?: string,
    isHidden?: boolean,
    isLocked?: boolean
}

// 单个历史记录的格式
export type operatePropsLevel = 'widgetProps' | 'widget' | 'page'
export declare interface updateProps {
    props: keyof AllWidgetProps | keyof widgetData | keyof AllWidgetProps[], // 还需添加page的props
    level: operatePropsLevel,
    newValue: any, // 游标到该记录应显示新值，回退显示旧值
    oldValue: any,
    id: string // 确定是哪个物料
}
export declare interface operateWidgetList {
    // 代表索引index，也可以代表物料ID,如果是同时改变很多物料顺序，可按ID前后的顺序还原
    beforeIndexOrId: number | string[], // 通过-1区分新增/删除
    afterIndexOrId: number | string[],
    widgetData?: widgetData,
}
export declare interface historyRecord {
    type: 'changeList' | 'changeProps', // 从两个层级记录：物料列表、物料单体/页面设置
    data: operateWidgetList | updateProps,
}

// page的数据结构
export declare type PageDate = {
    id: number,
    title: string,
    desc: string,
    coverImg: string,
    props: Partial<commonProps> // 样式取自部分公用属性
}

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
