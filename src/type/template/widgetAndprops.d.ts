import { widgetData, AllWidgetProps } from '@/type/widgets'
// 左侧物料模版的结构
export declare interface widgetTemplate {
    label: string,
    widgetList: widgetData[],
    // 是否需要渲染成大卡片去包含多个物料
    isRenderCard?: boolean,
    // 物料是否需要带样式显示，指定需要按props的哪个属性
    renderStyleKey?: keyof AllWidgetProps
    // 是否需要将这个物料的初始样式都渲染
    needRenderWidget?: boolean
}

// 右侧属性表单项的映射

// 目前已经出现的组件名称，方便后面再次出现时提示
type HasFormItemName = 'a-textarea' | 'a-input' | 'a-radio-group'
    | 'a-slider' | 'a-select' | 'a-input-number' | 'fields-color'
    | 'fields-select' | 'fields-img'

type ExtraProps = {
    size?: string,
    type?: string
    // 输入框
    placeholder?: string,
    change?: (param: string) => string,
    // 滑动输入器，内部默认都是希望数字
    max?: number,
    min?: number,
    step?: number,
    'tip-formatter'?: (param: number) => number | string
    // 单选
    options?: {
        label: string | VNode
        value: string | number | null | undefined
    }[],
    optionType?: 'default' | 'button',
    // 数字输入器，内部默认都是希望数字
    formatter?: (param: number) => number | string // 回显的格式
    parser?: (param: number) => number | string // 与formatter搭配
    // 图片选择器
    isNeedDelete?: boolean
}

export type PropsToForm = {
    components: HasFormItemName | HasFormItemName[], // 对应要渲染的组件
    subComponent?: string,
    combination?: {
        isCombinationProp: boolean, // 需要将传入的属性拆分成多个小属性
        combinationRules: (defaultValue: string) => string[]
    },
    label: string | string[], // 标签名称
    value?: string, // 表单项对应初始值与存储值的地方，渲染右侧表单时会用来赋初始值
    // 其它需约束表单项的属性，挂载在渲染的组件上
    extraProps?: ExtraProps | ExtraProps[],
    // 可能需要挂载到表单组件的事件
    extraEvents?: {
        [key: string]: (...arg: any[]) => any
    },
    // 更新到仓库需要修改的格式
    reverseFormat?: ((param: number | string) => number | string) | any

}

export type PropsTableMap = {
    [propName in keyof AllWidgetProps]?: PropsToForm // 注意该写法
}

export type PropsTableTitleMap = {
    label: string,
    build: PropsTableMap
}
