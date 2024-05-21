
import { defineComponent, PropType } from 'vue'
// import {Select } from 'ant-design-vue'
import type { SelectProps } from 'ant-design-vue'

export default defineComponent({
    name: 'fields-select',
    props: {
        value: { // 选中的值
            type: [String, Number],
            required: true
        },
        options: {
            type: Array as PropType<SelectProps['options']>, // 注意写法
            required: true
        }
    },
    // emits: ['update:value'], 可以省略，未知原因
    setup(props, context) {
        const handleFn = function (event) {
            context.emit('update:value', event)
        }
        return () =>
                <a-select value={props.value}
                    // @ts-ignore
                    onChange={handleFn}
                    style="width: 120px" >
                    {
                        props.options!.map((option) => {
                            return <a-select-option value={option.value}>{option.label}</a-select-option>
                        })
                    }
                </a-select>
    }
})
