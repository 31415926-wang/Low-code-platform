
import type { Module } from 'vuex'
import type { editorState } from '@/type/store/modules/editorStore'
import type { widgetData, AllWidgetProps } from '@/type/widgets/index'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import { arrayMoveMutable } from 'array-move'

const editorStore: Module<editorState, any> = {
    // 避免方法调用同名，不然方法调用可能同名
    namespaced: true,
    state: {
        components: [],
        currentComponent: ''
    },
    mutations: {
        addWidget(state, param: {
            widgetData: widgetData,
            widgetIndex?: number
        }) {
            const InstanceWidget = {
                id: uuidv4(),
                layerName: `图层${state.components.length + 1}`,
                ...cloneDeep(param.widgetData) // 注意这里是浅拷贝
            }
            if (param.widgetIndex !== undefined) {
                state.components.splice(param.widgetIndex, 0, InstanceWidget)
            } else {
                state.components.push(InstanceWidget)
            }
        },
        // changeType决定修改哪层级的属性
        updateWidget(state, param: {
            changeKey: keyof AllWidgetProps | keyof widgetData, changeValue: any,
            changeType?: 'props' | 'widget' | 'page'
        }) {
            const selectWidget: widgetData = state.components.find(item => state.currentComponent === item.id)!
            if (param.changeType === 'widget') {
                selectWidget[param.changeKey] = param.changeValue
            } else {
                selectWidget.props[param.changeKey] = param.changeValue
            }
            console.log('更新Widget')
        },
        deleteWidget(state) {
            state.components = state.components.filter((item: widgetData) => item.id !== state.currentComponent)
            state.currentComponent = ''
        },
        selectWidget(state, id: string) {
            state.currentComponent = id
        },
        // 改变物料顺序
        adjustList(state, { start, end }) {
            arrayMoveMutable(state.components, start, end)
        },
        setList(state, newComponentslist) {
            state.components = newComponentslist
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
