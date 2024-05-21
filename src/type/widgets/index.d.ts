import { VNode } from 'vue'

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

// 左侧物料模版的结构
export declare interface widgetTemplate {
    label: string,
    widgetList: widgetData[]
}

// 右侧属性表单项的映射

// 目前已经出现的组件名称，方便后面再次出现时提示
type HasFormItemName = 'a-textarea' | 'a-input' | 'a-radio-group'
    | 'a-slider' | 'a-select' | 'a-input-number' | 'fields-color'
    | 'fields-select'

export type PropsToForm = {
    components: HasFormItemName, // 对应要渲染的组件
    subComponent?: string,
    label: string, // 标签名称
    value?: string, // 表单项对应初始值与存储值的地方，约定好value作为key
    // 其它需约束表单项的属性
    extraProps?: {
        size?: string,
        type?: string
        // 输入框
        placeholder?: string,
        //  滑动输入器
        max?: number,
        min?: number,
        step?: number,
        'tip-formatter'?: (param: number) => number | string
        //  单选
        options?: {
            label: string | VNode
            value: string | number | null | undefined
        }[],
        optionType?: 'default' | 'button',
        // 数字输入器
        formatter?: (param: number) => number | string // 回显的格式
        parser?: (param: number) => number | string // 赋值的格式
    },
    reverseFormat?: (param: number | string) => number | string // 翻转处理格式

}
