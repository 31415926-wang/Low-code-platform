import { AllWidgetProps } from '@/type/widgets/index'
import { cloneDeep } from 'lodash-es'
import { PropsToForm } from '@/type/widgets'
import type { SelectProps } from 'ant-design-vue'
import { StyleValue, VNode } from 'vue'

export type PropsTableMap = {
    [propName in keyof AllWidgetProps]?: PropsToForm // 注意该写法
}

export type PropsTableTitleMap = {
    label: string,
    build: PropsTableMap
}

// 通用函数，供每个表单项可以用
const commonSliderPxReverseFormat = (v: number | string) => String(v).indexOf('px') === -1 ? v + 'px' : Number(String(v).replace('px', ''))
const commonNumberPxFormatter = (v: number | string) => String(v).indexOf('px') === -1 ? v + 'px' : v

// 单独抽离每一个物料的
export const textPropsMap: PropsTableMap = {
    textValue: {
        components: 'a-textarea',
        label: '段落内容',
        extraProps: {
            placeholder: '请输入内容'
        }
    },
    titleValue: {
        components: 'a-input',
        label: '标题',
        extraProps: {
            placeholder: '请输入标题'
        }
    },
    fontSize: {
        components: 'a-input-number',
        label: '字号',
        extraProps: {
            max: 50,
            min: 10,
            formatter: commonNumberPxFormatter, // 添加px
            parser: (v) => Number(String(v).replace('px', '')) // 修改通过输入框时因为不是数字的bug
        },
        reverseFormat: commonSliderPxReverseFormat
    },
    textAlign: {
        components: 'a-radio-group',
        label: '对齐方式',
        extraProps: {
            options: [
                {
                    label: '左对齐', value: 'left'
                },
                {
                    label: '居中', value: 'center'
                },
                {
                    label: '右对齐', value: 'right'
                }
            ],
            optionType: 'button'
        }
    },
    fontWeight: {
        components: 'fields-select',
        label: '字重',
        extraProps: {
            options: renderVnodeOptions('fontWeight', [
                {
                    label: 'lighter', value: 'lighter'
                },
                {
                    label: 'normal', value: 'normal'
                },
                {
                    label: 'bold', value: 'bold'
                },
                {
                    label: 'bolder', value: 'bolder'
                }

            ])
        }
    },
    fontFamily: {
        components: 'fields-select',
        label: '字体类型',
        extraProps: {
            options: renderVnodeOptions('fontFamily', [
                { label: '宋体', value: '"SimSun","STSong"' },
                { label: '黑体', value: '"SimHei","STHeiti"' },
                { label: '楷体', value: '"KaiTi","STKaiti"' },
                { label: '仿宋', value: '"FangSong","STFangsong"' }
            ])
        }
    },
    color: {
        components: 'fields-color',
        label: '颜色',
        extraProps: {
            type: 'color'
        }
    }
}
export const commonPropsMap: PropsTableMap = {

    opacity: {
        components: 'a-slider',
        label: '透明度',
        extraProps: {
            max: 1,
            step: 0.1,
            'tip-formatter': (value) => `${value * 100}%`
        },
        reverseFormat: (v) => 1 - Number(v)
    },
    paddingTop: {
        components: 'a-slider',
        label: '内边距上',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: commonSliderPxReverseFormat
    },
    paddingBottom: {
        components: 'a-slider',
        label: '内边距下',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: commonSliderPxReverseFormat
    }

}

/*
    映射结构可以决定分类，也能决定表单项的渲染顺序
    还能决定props对应的key，要渲染成哪个表单项，且具备哪些初始限制
*/
export const propsTableMap: PropsTableTitleMap[] = [
    {
        label: '组件属性',
        build: {
            ...textPropsMap
        }
    },
    {
        label: '通用属性',
        build: {
            ...commonPropsMap
        }
    }
]

// 映射转换方法
export function propsToFormFn(props: Partial<AllWidgetProps>) {
    // 过滤模版，只保留出现props出现key的对应映射
    const propsKeys = Object.keys(props)
    // console.log('断点', propsKeys)

    const template = cloneDeep(propsTableMap)
    template.forEach((item: PropsTableTitleMap) => {
        for (const key in item.build) {
            if (!propsKeys.includes(key)) { // 过滤
                delete item.build[key as keyof AllWidgetProps]
            } else { // 追加默认值
                const tempKey = propsKeys.find(i => i === key)
                // console.log('断点1', tempKey)
                // @ts-ignore
                item.build[key as keyof AllWidgetProps].value = props[tempKey as keyof AllWidgetProps]
            }
        }
    })

    return template
}

// 将选项转换为带样式的选项
function renderVnodeOptions(styleKey: string, nativeOptions: SelectProps['options']) {
    return nativeOptions?.map((option) => {
        return {
            // 注意写法
            label: <span style={{ [styleKey as any]: option.value }} >{option.label}</span> as VNode,
            value: option.value
        }
    })
}
