import type { widgetData } from '../.././widgets/index'

export interface editorState {
    // 编辑器已添加的组件/物料列表
    components: widgetData[],
    // 选中的物料组件
    currentComponent: string
}
