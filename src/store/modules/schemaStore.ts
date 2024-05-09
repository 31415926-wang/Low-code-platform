
import type { Module } from 'vuex'
import type { schemaState } from '@/type/store/modules/schemaStore'

const schemaStore: Module<schemaState, any> = {
    namespaced: true, // 避免方法调用同名，不然方法调用可能同名
    state: {
        prop1: '初始化'
    },
    mutations: {
        updateProp(state) {
            state.prop1 = '已更新'
        }
    }
}

export default schemaStore
