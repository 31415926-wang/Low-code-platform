
import { createStore, useStore as vuexUseStore } from 'vuex'
import editorStore from './modules/editorStore'
import userStore from './modules/userStore'
import apiStore from './modules/apiStore'
import menuStore from './modules/menuStore'
import type { storeData } from '@/type/store/index'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    // modules: ['editorStore', 'userStore']
    modules: ['userStore']
})

const store = createStore({
    modules: {
        editorStore,
        userStore,
        apiStore,
        menuStore
    },
    plugins: [
        vuexLocal.plugin
    ]
})

export default store

// 重写useStore方法，因为该方法默认的泛型是any
export function useStore() {
    return vuexUseStore<storeData>()
}
