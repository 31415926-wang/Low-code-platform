
export interface Widgets {
    /* 基础信息 */
    name: string,
    icon: string,
    component?: string // 标识组件名称，后续读取文件名填充
    id?: string,
    /* 样式与属性 */
    fields?: {
        value?: {
            lable?: string,
            [propName: string]: any
        } | string,
        style?: any
        [propName: string]: any

    },
    [propName: string]: any
}
