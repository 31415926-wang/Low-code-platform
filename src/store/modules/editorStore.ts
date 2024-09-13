
import type { Module, ActionContext } from 'vuex'
import type {
    editorState,
    updateWidgetParam,
    addWidgetParam,
    deleteWidgetParam,
    SetListParams
} from '@/type/store/modules/editorStore'
import type { AllWidgetProps } from 'question-star-bricks'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep, pick, isEqual } from 'lodash-es'
import { arrayMoveMutable } from 'array-move'
import { message } from 'ant-design-vue'
import { reqDetailWork, reqSaveWork } from '@/api/works/workItem'
import { DetailTemplateOrWork, CreateOrSaveWorkDate } from '@/type/api/work'
import {
    widgetData,
    operateWidgetList,
    updateProps,
    historyRecord,
    PageDate
} from '@/type/store/modules/editorStore'

const updateHistory = (type: 'changeList' | 'changeProps', state: editorState, data: operateWidgetList | updateProps) => {
    // 判断是否为中途插入，是则清空后面，再插入
    if (state.history.index !== state.history.historyRecords.length - 1) {
        // 清空当前索引之后的记录
        state.history.historyRecords.splice(state.history.index + 1)
    }

    state.history.historyRecords.push({
        type,
        data
    })
    state.history.index++

    // 判断最大长度，已经溢出且索引在最后一位，则去掉第一一位，且索引不变
    if ((state.history.historyRecords.length > state.history.maxLength) &&
        (state.history.index === state.history.historyRecords.length - 1)
    ) {
        console.log('溢出')
        state.history.historyRecords.shift()
        state.history.index--
    }
}

const currentHistoryUndoOrRedoOperate = (type: 'undo' | 'redo', action: ActionContext<editorState, any>) => {
    const { commit, getters, state } = action
    const currentHistoryRecord: historyRecord = getters.currentHistoryRecord
    // 撤销：先判断当前的记录类型，再撤销当前的记录操作（参考课程是使用直接修改，不再经过仓库）
    // 重做：需索引改变后，再看新的记录是执行什么操作

    if (currentHistoryRecord.type === 'changeList') {
        // 如果是列表层更新的类型，可区分是新增、删除、排序
        const data = (currentHistoryRecord.data as operateWidgetList)
        if (data.widgetData) {
            const deleteFn = (deleteIndex: number) => {
                commit('deleteWidget', {
                    deleteIndex,
                    noRecord: true
                })
            }
            const addFn = (addIndex: number) => {
                commit('addWidget', {
                    widgetData: data.widgetData,
                    widgetIndex: addIndex,
                    entireWidget: true,
                    noRecord: true
                })
            }
            switch (-1) {
                case data.beforeIndexOrId:// 该记录为新增
                    type === 'undo' ? deleteFn(data.afterIndexOrId as number) : addFn(data.afterIndexOrId as number)
                    break
                case data.afterIndexOrId:// 该记录为删除
                    type === 'undo' ? addFn(data.beforeIndexOrId as number) : deleteFn(data.beforeIndexOrId as number)
                    break
            }
        } else { // 排序
            // 如果是撤销，则恢复到beforeIndexOrId的顺序。如果是重做，恢复到afterIndexOrId顺序
            const list: widgetData[] = []
            const byKey = type === 'undo'
                ? 'beforeIndexOrId'
                : 'afterIndexOrId';

            (data[byKey] as string[]).forEach((item: string) => {
                state.components.forEach((widget: widgetData) => {
                    if (widget.id === item) {
                        list.push(widget)
                    }
                })
            })

            commit('setList', { newlist: list, noRecord: true })
        }
    } else if (currentHistoryRecord.type === 'changeProps') {
        // 该记录为值更新
        const data = (currentHistoryRecord.data as updateProps)

        const updateFn = (changeKey, changeValue) => {
            commit('updateWidget', {
                changeKey,
                changeValue,
                changeType: data.level,
                widgetId: data.id,
                noRecord: true
            })
        }
        if (Array.isArray(data.props)) {
            data.props.forEach((item, index) => {
                updateFn(item, type === 'undo' ? data.oldValue[index] : data.newValue[index])
            })
        } else {
            updateFn(data.props, type === 'undo' ? data.oldValue : data.newValue)
        }
    }
}

const editorStore: Module<editorState, any> = {
    // 避免方法调用同名，不然方法调用可能同名
    namespaced: true,
    state: {
        components: [],
        currentComponent: '',
        copiedComponent: null,
        openGridLine: true,
        canvasRate: 1,
        history: {
            index: -1,
            historyRecords: [],
            maxLength: 8
        },
        page: {
            id: 0,
            title: '我的作品',
            desc: '',
            coverImg: '',
            props: {
            }
        },
        cacheValue: null,
        cacheSaveDate: {}
    },
    // 若不通过mutations，直接修改，会导致无法持久化本次更新
    mutations: {
        initWorkInfo(state, params: DetailTemplateOrWork) {
            const pageInfoKeys: (keyof PageDate)[] = ['title', 'desc', 'id', 'coverImg']
            state.page = Object.assign(state.page, pick(params, pageInfoKeys))
            if (params.content) {
                state.page.props = params.content.props
                state.components = params.content.components
            } else {
                /* 初始化的页面属性 */
                state.page.props = {
                    'background-color': '#ffffff',
                    'background-image': '',
                    height: '896px',
                    width: '414px'
                }
                state.components = []
            }
        },
        storageCacheSaveDate(state) {
            state.cacheSaveDate = {
                components: cloneDeep(state.components),
                page: cloneDeep(state.page)
            }
        },
        setPageName(state, value: string) {
            state.page.title = value
        },
        setCacheValue(state, value: any) {
            state.cacheValue = value
        },
        setOpenGridLine(state, value: boolean) {
            state.openGridLine = value
        },
        setRate(state, value: number) {
            state.canvasRate = value
        },
        selectWidget(state, id: string) {
            state.currentComponent = id
        },
        addWidget(state, {
            widgetData,
            widgetIndex,
            entireWidget,
            noRecord = false
        }: addWidgetParam) {
            // eslint-disable-next-line
            const InstanceWidget = entireWidget ? widgetData : {
                id: uuidv4(),
                layerName: `图层${state.components.length + 1}`,
                ...cloneDeep(widgetData) // 注意这里是浅拷贝
            }
            if (widgetIndex !== undefined) {
                state.components.splice(widgetIndex, 0, InstanceWidget)
            } else {
                state.components.push(InstanceWidget)
            }
            // 存入历史
            if (!noRecord) {
                updateHistory('changeList', state, {
                    beforeIndexOrId: -1,
                    afterIndexOrId: widgetIndex || state.components.length - 1,
                    widgetData: InstanceWidget
                })
            }
        },
        deleteWidget(state, { deleteIndex, noRecord = false }: deleteWidgetParam) {
            if (deleteIndex === undefined && this.getters['editorStore/selectedWidgetIndex'] === -1) {
                return
            }
            deleteIndex = deleteIndex === undefined ? this.getters['editorStore/selectedWidgetIndex'] : deleteIndex
            const widgetData: widgetData = state.components.find((item: widgetData, index: number) => index === deleteIndex)!
            state.components = state.components.filter((item: widgetData, index: number) => index !== deleteIndex)

            // 存入历史
            if (!noRecord) {
                state.currentComponent = ''
                message.success('删除选中元素成功!')
                updateHistory('changeList', state, {
                    beforeIndexOrId: deleteIndex!,
                    afterIndexOrId: -1,
                    widgetData
                })
            }
        },
        // changeType决定修改哪层级的属性
        updateWidget(state, {
            changeKey,
            changeValue,
            changeType = 'widgetProps',
            widgetId, // 是否需要具体修改哪个物料，默认当前物料
            noRecord = false
        }: updateWidgetParam) {
            let oldValue: any
            const goalWidget: widgetData = widgetId
                ? state.components.find((item: widgetData) => widgetId === item.id)
                : this.getters['editorStore/selectedWidget']

            console.log('更新Widget', changeKey, changeValue)
            switch (changeType) {
                case 'widget':
                    oldValue = goalWidget[changeKey]
                    goalWidget[changeKey] = changeValue
                    break
                case 'page':
                    oldValue = state.page.props[changeKey]
                    state.page.props[changeKey] = changeValue
                    break
                case 'widgetProps':
                    if (Array.isArray(changeKey)) {
                        oldValue = []
                        changeKey.forEach((item: keyof AllWidgetProps, index) => {
                            oldValue.push(goalWidget.props[item])
                            goalWidget.props[item] = changeValue[index]
                        })
                    } else {
                        oldValue = goalWidget.props[changeKey]
                        goalWidget.props[changeKey] = changeValue
                    }

                    break
            }

            // 存入历史
            if (!noRecord) {
                if (state.cacheValue) {
                    oldValue = state.cacheValue
                }
                updateHistory('changeProps', state, {
                    props: changeKey,
                    level: changeType,
                    newValue: changeValue,
                    oldValue,
                    id: goalWidget && goalWidget.id!
                })
            }
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

                // state.components.push(newWidget)
                // @ts-ignore
                this.commit('editorStore/addWidget', {
                    widgetData: newWidget,
                    widgetIndex: undefined,
                    entireWidget: true
                })
                message.success('粘贴元素成功!')
            }
        },
        // 改变物料顺序
        setList(state, {
            newlist, noRecord = false
        }: SetListParams) {
            // 存入历史，相当于改变在列表层
            if (!noRecord) {
                updateHistory('changeList', state, {
                    beforeIndexOrId: state.components.map((item) => item.id) as string[],
                    afterIndexOrId: newlist.map((item) => item.id) as string[]
                })
            }

            state.components = newlist
        },
        // 改变物料顺序，练习用
        adjustList(state, { start, end }) {
            arrayMoveMutable(state.components, start, end)
        }

    },
    actions: {
        undo(context) {
            const { state, getters } = context
            if (getters.allowUndo) {
                currentHistoryUndoOrRedoOperate('undo', context)
                // 索引后退
                state.history.index--
            }
        },
        redo(context) {
            const { state, getters } = context
            if (getters.allowRedo) {
                // 索引前进
                state.history.index++
                currentHistoryUndoOrRedoOperate('redo', context)
            }
        },
        // 读取作品
        async readWork(context, id: number) {
            try {
                // 请求读取作品
                const result = await reqDetailWork(id)
                // 成功后调用mutation，赋值编辑器
                context.commit('initWorkInfo', result.data)
                // context.commit('initWorkInfo', [])
                // 存储当前的作品数据
                context.commit('storageCacheSaveDate')
            } catch (error) {
                return Promise.reject(new Error('error'))
            }
        },
        // 保存作品
        async saveWork(context) {
            const { state, commit } = context
            const { title, desc, coverImg } = state.page
            try {
                const formDate: CreateOrSaveWorkDate = {
                    title,
                    desc,
                    coverImg,
                    content: {
                        components: state.components,
                        props: state.page.props
                    }
                }
                await reqSaveWork(state.page.id, formDate)
                message.success('保存成功!')
                // 存储当前的作品数据
                commit('storageCacheSaveDate')
                return true
            } catch (error) {
                message.error('保存失败!')
                return Promise.reject('error')
            }
        }
    },
    getters: { // 从源码的ts可以看到，getters并没有指定返回类型，后面返回也无效，需使用时指定
        selectedWidgetIndex(state) {
            return state.components.findIndex(item =>
                state.currentComponent === item.id
            )
        },
        selectedWidget(state) {
            return state.components.find(item =>
                state.currentComponent === item.id
            )
        },
        selectWidgetDom(state) {
            return document.getElementById('' + state.currentComponent)
        },
        currentHistoryRecord(state) {
            const { index, historyRecords } = state.history
            if (historyRecords.length > 0 && index !== -1) {
                return historyRecords[index]
            } else {
                return null
            }
        },
        allowUndo(state) {
            return state.history.index >= 0 && state.history.historyRecords.length > 0
        },
        allowRedo(state) {
            return state.history.index >= -1 &&
                state.history.index < state.history.historyRecords.length - 1
        },
        isWithoutSave(state) {
            // 当前作品与存储的作品数据对比
            return !(isEqual(state.cacheSaveDate?.components, state.components) && isEqual(state.cacheSaveDate?.page, state.page))
        }
    }

}

export default editorStore
