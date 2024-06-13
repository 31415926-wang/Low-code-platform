import type { editorState } from './modules/editorStore'
import type { apiState } from './modules/apiStore'

// 供全局引入store时提示各模块仓库，及其state类型
export interface storeData {
    editorStore: editorState,
    userStore: any,
    apiStore: apiState
}
