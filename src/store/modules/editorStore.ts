
import type { Module } from 'vuex'
import type { editorState } from '@/type/store/modules/editorStore'
import type { widgetData, AllWidgetProps } from '@/type/widgets/index'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import { arrayMoveMutable } from 'array-move'
import { message } from 'ant-design-vue'

const editorStore: Module<editorState, any> = {
    // 避免方法调用同名，不然方法调用可能同名
    namespaced: true,
    state: {
        components: [],
        currentComponent: '',
        copiedComponent: null
    },
    mutations: {
        selectWidget(state, id: string) {
            state.currentComponent = id
        },
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
        deleteWidget(state) {
            state.components = state.components.filter((item: widgetData) => item.id !== state.currentComponent)
            state.currentComponent = ''
            message.success('删除选中元素成功!')
        },
        // changeType决定修改哪层级的属性
        updateWidget(state, param: {
            changeKey: keyof AllWidgetProps | keyof widgetData, changeValue: any,
            changeType?: 'props' | 'widget' | 'page'
        }) {
            const selectWidget = this.getters['editorStore/selectedWidget']
            if (param.changeType === 'widget') {
                selectWidget[param.changeKey] = param.changeValue
            } else {
                selectWidget.props[param.changeKey] = param.changeValue
            }
            console.log('更新Widget', param.changeKey)
        },
        // 复制物料
        copyComponent(state) {
            if (state.currentComponent) {
                state.copiedComponent = cloneDeep(this.getters['editorStore/selectedWidget'])
                message.success('复制元素成功!')
            }
        },
        // 粘贴物料
        pasteComponent(state) {
            if (state.copiedComponent) {
                const newWidget = cloneDeep(state.copiedComponent)
                newWidget.id = uuidv4()
                newWidget.layerName = state.copiedComponent.layerName + '副本'

                state.components.push(newWidget)
                message.success('粘贴元素成功!')
            }
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
        selectedWidget(state): widgetData | undefined {
            return state.components.find(item =>
                state.currentComponent === item.id
            )
        },
        selectWidgetDom(state): HTMLElement | null {
            return document.getElementById('' + state.currentComponent)
        }

    }

}

export default editorStore
