
import { widgetData, widgetTemplate, WidgetName } from '@/type/widgets/index'
import { defaultCommonProps, defaultTextProps } from '@/widgets/defaultProps'

const defaultTemplate: widgetTemplate[] = [
    {
        label: '文本类型',
        widgetList: [
            createCommonWidget('QsText', {
                text: '标题文字',
                tag: 'h2'
            }, 'FontSizeOutlined', '标题'),
            createCommonWidget('QsText', {
                text: '正文内容',
                tag: 'h4'
            }, 'FontSizeOutlined', '副标题'),
            createCommonWidget('QsText', {
                text: '正文内容',
                tag: 'p'
            }, 'FontSizeOutlined', '正文')
        ]
    }
]

function createCommonWidget(widgetName: WidgetName, injectProps: object, icon: string, title: string): widgetData {
    return {
        name: widgetName,
        props: {
            ...defaultCommonProps,
            ...defaultTextProps,
            ...injectProps
        },
        icon,
        title
    }
}

export default defaultTemplate
