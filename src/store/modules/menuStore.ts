import type { Module } from 'vuex'

const menuStore: Module<{ showMenu: boolean }, any> = {
    namespaced: true,
    state: {
        showMenu: false
    },
    mutations: {
        setShowMenu(state, val) {
            state.showMenu = val
        }
    }
}

export default menuStore
