
import { createStore } from 'vuex'
import schemaStore from './modules/schemaStore'
import userStore from './modules/userStore'

const store = createStore({
    modules: {
        schemaStore,
        userStore
    }
})

export default store
