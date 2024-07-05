
// 物料的prop属性
export declare type commonProps = {
    tag?: string,
    url?: string,
    height: string,
    width: string,
    'padding-left': string;
    'padding-right': string;
    'padding-top': string;
    'padding-bottom': string;
    opacity: number,
    position: string,
    top?: string,
    left?: string,
    'border-radius': string,
    'border-color': string,
    'border-style': string,
    'border-width': string,
    'background-color': string,
    'background-image': string,
    'box-shadow': string
    rotate: string,
    scale: number,
    'text-shadow': string
}
export declare type textProps = {
    // 通过初始值去决定表单项
    textValue?: string,
    titleValue?: string,
    fontSize: string,
    fontFamily: string,
    fontWeight: string,
    fontStyle: string,
    lineHeight: number,
    textAlign: any, // 类型未知原因
    color: string
}
export declare type imgProps = {
    src: string
}

export declare type AllWidgetProps = commonProps & textProps & imgProps

/* 完整物料的结构 */
export declare type WidgetName = 'QsText' | 'QsImg' | 'QsStyleFont'// 业务组件的名称

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
    name: string,
    props: Partial<commonProps> // 样式取自部分公用属性
}
