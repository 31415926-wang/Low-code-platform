import { AllWidgetProps } from '@/type/widgets/index'
import { cloneDeep, pick } from 'lodash-es'
import { PropsTableMap, PropsTableTitleMap, ExtraProps } from '@/type/template/widgetAndprops'
import type { SelectProps } from 'ant-design-vue'
import { VNode } from 'vue'

// 赋值前和赋值后对px等单位的处理，值在内部为数值流动
const UnitReverseFormat = (goalUnit: string) => {
    return (v: number | string) => typeof v === 'number' ? v + goalUnit : Number(String(v).replace(goalUnit, ''))
}
const trimReverseFormat = (v: string) => {
    return v.trim()
}

// a-input-number专用的，数字转换为其它单位回显
const InputNumberFormatter = (goalUnit: string) => {
    const NumberEchoRlues = (v: number) => v + goalUnit
    const NumberEchoRluesParser = (v) => Number(String(v).replace(goalUnit, ''))

    return {
        NumberEchoRlues,
        NumberEchoRluesParser
    }
}

// 单独抽离每一个物料的
export const imgPropsMap: PropsTableMap = {
    src: {
        components: 'fields-img',
        label: '图片设置'
    }
}
export const textPropsMap: PropsTableMap = {
    titleValue: {
        components: 'a-input',
        label: '标题',
        extraProps: {
            placeholder: '请输入标题'
        },
        reverseFormat: trimReverseFormat
    },
    textValue: {
        components: 'a-textarea',
        label: '正文内容',
        extraProps: {
            placeholder: '请输入内容'
        },
        extraEvents: {
            input: (event: InputEvent) => { // 修复textarea显示不会直接与仓库传入的value一致的问题
                // @ts-ignore
                event.target.value = event.target.value.trim()
            }
        },
        reverseFormat: trimReverseFormat
    },
    fontSize: {
        components: 'a-input-number',
        label: '字号',
        extraProps: {
            max: 50,
            min: 10,
            formatter: InputNumberFormatter('px').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('px').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('px')
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
                { label: '仿宋', value: '"FangSong","STFangsong"' },
                { label: 'Arial', value: '"Arial", "sans-serif"' },
                { label: 'Comic Sans', value: '"Comic Sans MS"' },
                { label: 'Courier New', value: '"Courier New", monospace' },
                { label: 'Times New Roman', value: '"Times New Roman", serif' }
            ])
        }
    },
    color: {
        components: 'fields-color',
        label: '字体颜色'
    },
    'text-shadow': {
        components: ['a-slider', 'a-slider'],
        label: ['阴影大小', '阴影模糊'],
        isCombinationProp: true,
        combinationRules: (defaultValue: string) => {
            if (defaultValue === 'none') {
                defaultValue = '0px 0px 0px'
            }
            const spitResult = defaultValue.split(' ')
            const result = [spitResult[0] + ' ' + spitResult[1], spitResult[2]]
            return result
        },
        extraProps: [
            {
                max: 25,
                step: 1,
                'tip-formatter': (value) => `${value}px`
            },
            {
                max: 25,
                step: 1,
                'tip-formatter': (value) => `${value}px`
            },
            {}
        ],
        reverseFormat: [
            (v: string) => {
                if (typeof v === 'number') {
                    return `${v}px ${v}px`
                } else {
                    return Number(v.split('px')[0])
                }
            },
            UnitReverseFormat('px'),
            (v) => v]
    }
}
export const commonPropsMap: PropsTableMap = {
    top: {
        components: 'a-input-number',
        label: 'Y轴坐标',
        extraProps: {
            max: 500,
            min: 1,
            formatter: InputNumberFormatter('px').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('px').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('px')
    },
    left: {
        components: 'a-input-number',
        label: 'X轴坐标',
        extraProps: {
            max: 500,
            min: 1,
            formatter: InputNumberFormatter('px').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('px').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('px')
    },
    opacity: {
        components: 'a-slider',
        label: '透明度',
        extraProps: {
            max: 1,
            step: 0.1,
            'tip-formatter': (value) => `${value * 100}%`
        },
        reverseFormat: (v: number) => 1 - v
    },
    'padding-left': {
        components: 'a-slider',
        label: '内边距右',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'padding-right': {
        components: 'a-slider',
        label: '内边距左',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'padding-top': {
        components: 'a-slider',
        label: '内边距上',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'padding-bottom': {
        components: 'a-slider',
        label: '内边距下',
        extraProps: {
            max: 50,
            step: 1,
            'tip-formatter': (value) => `${value}px`
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'background-color': {
        components: 'fields-color',
        label: '背景颜色'
    },
    'background-image': {
        components: 'fields-img',
        label: '背景图片'
    },
    'border-radius': {
        components: 'a-input-number',
        label: '边框圆角',
        extraProps: {
            max: 25,
            min: 0,
            formatter: InputNumberFormatter('px').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('px').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'border-color': {
        components: 'fields-color',
        label: '边框颜色'
    },
    'border-style': {
        components: 'fields-select',
        label: '边框样式',
        extraProps: {
            options: [
                {
                    label: '无', value: 'none'
                },
                {
                    label: '实线', value: 'solid'
                },
                {
                    label: '虚线', value: 'dashed'
                },
                {
                    label: '圆点状', value: 'dotted'
                },
                {
                    label: '双实线，', value: 'double'
                }
            ]
        }
    },
    'border-width': {
        components: 'a-input-number',
        label: '边框宽度',
        extraProps: {
            max: 15,
            min: 0,
            formatter: InputNumberFormatter('px').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('px').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('px')
    },
    'box-shadow': {
        components: ['a-slider', 'a-slider', 'fields-color'],
        label: ['阴影大小', '阴影模糊', '阴影颜色'],
        isCombinationProp: true,
        combinationRules: (defaultValue: string) => {
            const spitResult = defaultValue.split(' ')
            const result = [spitResult[0] + ' ' + spitResult[1], spitResult[2], spitResult[3]]
            return result
        },
        extraProps: [
            {
                max: 25,
                step: 1,
                'tip-formatter': (value) => `${value}px`
            },
            {
                max: 25,
                step: 1,
                'tip-formatter': (value) => `${value}px`
            },
            {}
        ],
        reverseFormat: [
            (v: string) => {
                if (typeof v === 'number') {
                    return `${v}px ${v}px`
                } else {
                    return Number(v.split('px')[0])
                }
            },
            UnitReverseFormat('px'),
            (v) => v]
    },
    scale: {
        components: 'a-input-number',
        label: '缩放',
        extraProps: {
            max: 300,
            min: 50,
            step: 10,
            formatter: InputNumberFormatter('%').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('%').NumberEchoRluesParser
        },
        reverseFormat: (v) => {
            if (v < 10) {
                return Math.round(100 * v)
            } else {
                return (v / 100)
            }
        }
    },
    rotate: {
        components: 'a-input-number',
        label: '旋转',
        extraProps: {
            max: 180,
            min: -180,
            step: 10,
            formatter: InputNumberFormatter('°').NumberEchoRlues, // 添加px
            parser: InputNumberFormatter('°').NumberEchoRluesParser
        },
        reverseFormat: UnitReverseFormat('deg')
    }

}

export const AllPropsMap: PropsTableMap = { ...textPropsMap, ...imgPropsMap, ...commonPropsMap }

/*
    映射结构可以决定分类，也能决定表单项的渲染顺序
    还能决定props对应的key，要渲染成哪个表单项，且具备哪些初始限制
*/
const propsTableKeyGroup: { name: string, keys: (keyof AllWidgetProps)[] }[] = [

    {
        name: '文本属性',
        keys: ['textValue', 'titleValue', 'fontSize', 'textAlign', 'fontWeight', 'fontFamily', 'color', 'text-shadow']
    },
    {
        name: '图片属性',
        keys: ['src']
    },
    {
        name: '形状与位置',
        keys: ['top', 'left', 'scale', 'rotate', 'width', 'height', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom']
    },
    {
        name: '阴影与透明度',
        keys: ['opacity', 'box-shadow']
    },
    {
        name: '边框与背景',
        keys: ['border-radius', 'border-color', 'border-style', 'border-width', 'background-color', 'background-image']
    },
    {
        name: '事件功能',
        keys: ['url']
    }
]

// 映射转换方法
export function propsToFormFn(props: Partial<AllWidgetProps>): PropsTableTitleMap[] {
    // 过滤模版，只保留出现props出现key的对应映射
    const instancePropsKeys = Object.keys(props)
    // console.log('断点', instancePropsKeys)

    const propsTableMap: PropsTableTitleMap[] = []
    propsTableKeyGroup.forEach((item) => {
        propsTableMap.push({
            label: item.name,
            build: pick(AllPropsMap, ...item.keys)
        })
    })

    let template = cloneDeep(propsTableMap) // 基于上面的对象数组为模版
    template.forEach((item: PropsTableTitleMap) => {
        for (const key in item.build) {
            if (!instancePropsKeys.includes(key)) { // 过滤，当模版物料的props，是实例化物料的props没有时，不要渲染
                // console.log('断点', key)
                delete item.build[key as keyof AllWidgetProps]
            } else { // 追加默认值
                const tempKey = instancePropsKeys.find(i => i === key)
                // @ts-ignore
                item.build[key as keyof AllWidgetProps].value = props[tempKey as keyof AllWidgetProps]
            }
        }
    })

    // 整个标签为空时，也不比渲染，去掉build为空的
    template = template.filter((item: PropsTableTitleMap) => {
        return Object.keys(item.build).length !== 0
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
