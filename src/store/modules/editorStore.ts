
import type { Module } from 'vuex'
import type { editorState } from '@/type/store/modules/editorStore'
import type { widgetData } from '@/type/widgets/index'
import { v4 as uuidv4 } from 'uuid'
import { defaultCommonProps, defaultTextProps } from '@/widgets/defaultProps'

// 假设已经实例化的物料列表
// const testComponents: widgetData[] = [
//     {
//         id: uuidv4(),
//         name: 'QsText',
//         props: {
//             ...defaultCommonProps,
//             ...defaultTextProps,
//             text: 'hello'
//         }
//     },
//     {
//         id: uuidv4(),
//         name: 'QsText',
//         props: {
//             ...defaultCommonProps,
//             ...defaultTextProps,
//             text: '标题文字',
//             textAlign: 'center'
//         }
//     }
// ]

const editorStore: Module<editorState, any> = {
    // 避免方法调用同名，不然方法调用可能同名
    namespaced: true,
    state: {
        components: [],
        currentComponent: ''
    },
    mutations: {
        add() {
            console.log('add')
        }
    }
}

export default editorStore
