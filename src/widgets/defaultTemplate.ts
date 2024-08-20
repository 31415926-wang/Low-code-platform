
import { widgetTemplate } from '@/type/template/widgetAndprops'
import { defaultCommonProps, defaultTextProps, defaultImgProps, defaultShapeProps } from '@/widgets/defaultProps'

/* 负责左侧物料面板 */

// 默认的属性及其值
const paramTextProps = {
    ...defaultCommonProps,
    ...defaultTextProps
}
const paramImgProps = {
    ...defaultCommonProps,
    paddingTop: '0px',
    paddingBottom: '0px',
    width: '150px',
    ...defaultImgProps
}

const paramStyleFontProps = {
    ...defaultCommonProps,
    ...defaultTextProps,
    fontSize: '17px',
    paddingLeft: '10px',
    paddingRight: '10px'
}

const paramShapeProps = { // 图案类型似乎不需要那么多属性
    ...defaultShapeProps,
    width: '70px',
    height: '70px'
}

// console.log('断点0', paramTextProps)

export const defaultTemplate: widgetTemplate[] = [
    {
        label: '普通文本',
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
    },
    {
        label: '图片类型',
        widgetList: [
            {
                name: 'QsImg',
                props: {
                    ...paramImgProps
                },
                // icon: 'editor-img',
                icon: 'PictureOutlined',
                title: '图片'
            }
        ]
    },
    {
        label: '艺术字体',
        isRenderCard: true,
        renderStyleKey: 'font-family',
        widgetList: [
            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"KaiTi","STKaiti"',
                    textValue: '楷体标题'
                },
                title: '楷体标题'
            },

            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"Arial", "sans-serif"',
                    textValue: 'Arial'
                },
                title: 'Arial'
            },
            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"FangSong","STFangsong"',
                    textValue: '仿宋正文'
                },
                title: '仿宋正文'
            },
            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"Comic Sans MS"',
                    textValue: 'Comic Sans'
                },
                title: 'Comic Sans'
            },
            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"Courier New", monospace',
                    textValue: 'Courier New'
                },
                title: 'Courier New'
            },

            {
                name: 'QsStyleFont',
                props: {
                    ...paramStyleFontProps,
                    'font-family': '"Times New Roman", serif',
                    textValue: 'Times New Roman'
                },
                title: 'Times New Roman'
            }
        ]
    },
    {
        label: '形状图案',
        isRenderCard: true,
        needRenderWidget: true,
        widgetList: [
            {
                name: 'QsShape',
                props: {
                    ...paramShapeProps,
                    shapeValue: 'triangle',
                    'background-color': '#ffc0cb'
                },
                title: '三角形'
            },
            {
                name: 'QsShape',
                props: {
                    ...paramShapeProps,
                    shapeValue: 'circular',
                    'background-color': '#5ccac7'
                },
                title: '圆形'
            }, 
            {
                name: 'QsShape',
                props: {
                    ...paramShapeProps,
                    shapeValue: 'square',
                    'background-color': '#56aaee'
                },
                title: '正方形'
            },
            {
                name: 'QsShape',
                props: {
                    ...paramShapeProps,
                    shapeValue: 'square',
                    width: '80px',
                    height: '50px',
                    'background-color': '#9666d1'
                },
                title: '长方形'
            }
        ]
    }

]

export default defaultTemplate
