
import { widgetTemplate } from '@/type/widgets/index'
import { defaultCommonProps, defaultTextProps } from '@/widgets/defaultProps'

// 默认的属性及其值
const paramTextProps = {
    ...defaultCommonProps,
    ...defaultTextProps
}

// console.log('断点0', paramTextProps)

export const defaultTemplate: widgetTemplate[] = [
    {
        label: '文本类型',
        widgetList: [
            {
                name: 'QsText',
                props: {
                    ...paramTextProps,
                    titleValue: '标题文字1',
                    tag: 'h2'
                },
                icon: 'editor-h1',
                title: '一级标题'
            },
            {
                name: 'QsText',
                props: {
                    ...paramTextProps,
                    titleValue: '标题文字2',
                    tag: 'h4'
                },
                icon: 'editor-h2',
                title: '二级标题'
            },
            {
                name: 'QsText',
                props: {
                    ...paramTextProps,
                    titleValue: '标题文字3',
                    tag: 'p'
                },
                icon: 'editor-h3',
                title: '三级标题'
            },
            {
                name: 'QsText',
                props: {
                    ...paramTextProps,
                    textValue: '正文内容',
                    tag: 'p'
                },
                icon: 'CopyOutlined',
                title: '段落'
            }
        ]
    }
]

export default defaultTemplate
