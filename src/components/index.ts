import type { App } from 'vue'

// 统一注册全局组件（也包括物料）
export function useGlobalComponent(app: App) {
    // 读取公用组件components文件下
    const componentList = require.context('@/components', false, /\.vue$/)
    register(componentList, app)
    // 读取物料
    const widgetsList = require.context('@/widgets', true, /\.vue$/)
    register(widgetsList, app)
}

function register(fileList: any, app: App) {
    fileList.keys().forEach((key: string) => {
        /*
           如果组件是通过 ES6 的默认导出语法进行导出的，那么在获取文件后，
           可以通过 .default 属性来获取默认导出的组件
        */
        const file = fileList(key).default // || fileList(key)
        // console.log('单个文件', file) // 获取具体的文件
        app.component(file.__name, file)
    })
}
