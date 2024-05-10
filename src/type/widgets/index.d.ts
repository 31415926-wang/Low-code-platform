// 物料的prop属性
export declare type commonProps = {
    tag?: string,
    url?: string,
    height: string,
    width: string,
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
    opacity: number
}
export declare type textProps = {
    text: string,
    fontSize: string,
    fontFamily: string,
    fontWeight: string,
    fontStyle: string,
    lineHeight: number,
    textAlign: any, // 类型未知原因
    color: string
}

export declare type AllWidgetProps = commonProps & textProps

// 业务组件的名称
export declare type WidgetName = 'QsText'

// 单个完整物料的数据结构
export declare interface widgetData {
    // 物料添加到编辑区的唯一id
    id?: string,
    // 元素的属性
    props: Partial<AllWidgetProps>,
    // 对应业务(物料)组件库的组件名称
    name: WidgetName,
    // 公用物料图标
    icon: string,
    title: string
}

export declare interface widgetTemplate {
    label: string,
    widgetList: widgetData[]
}
