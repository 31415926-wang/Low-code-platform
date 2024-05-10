
import { createStore, useStore as vuexUseStore } from 'vuex'
import editorStore from './modules/editorStore'
import userStore from './modules/userStore'
import type { storeData } from '@/type/store/index'

const store = createStore({
    modules: {
        editorStore,
        userStore
    }
})

export default store

// 重写useStore方法，因为该方法默认的泛型是any
export function useStore() {
    return vuexUseStore<storeData>()
}
