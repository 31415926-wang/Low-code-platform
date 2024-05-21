
import type { Module } from 'vuex'
import type { editorState } from '@/type/store/modules/editorStore'
import type { widgetData, AllWidgetProps } from '@/type/widgets/index'
import { v4 as uuidv4 } from 'uuid'

const editorStore: Module<editorState, any> = {
    // 避免方法调用同名，不然方法调用可能同名
    namespaced: true,
    state: {
        components: [],
        currentComponent: ''
    },
    mutations: {
        addWidget(state, param: widgetData) {
            state.components.push({
                id: uuidv4(),
                ...param
            })
        },
        updateWidget(state, param: { changeKey: keyof AllWidgetProps, changeValue: any }) {
            const selectWidget: widgetData = state.components.find(item => state.currentComponent === item.id)!
            selectWidget.props[param.changeKey] = param.changeValue
        },
        deleteWidget(state) {
            state.components = state.components.filter((item: widgetData) => item.id !== state.currentComponent)
            state.currentComponent = ''
        },
        selectWidget(state, id: string) {
            state.currentComponent = id
        }
    },
    getters: {
        currentComponentWidget(state): widgetData | undefined {
            return state.components.find(item =>
                state.currentComponent === item.id
            )
        }

    }

}

export default editorStore
