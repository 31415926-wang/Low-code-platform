import type { App } from 'vue'

// 统一注册全局组件（也包括物料）
export function useGlobalComponent(app: App) {
    // 读取公用组件components文件下
    const componentList = require.context('@/components', true, /\.(vue|tsx)$/) // true表示查找子目录
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
        const reg = /.*\/(.*)\.(vue|tsx)/
        if (reg.exec(key)) {
            // @ts-ignore
            // console.log('单个文件2', reg.exec(key)[1]) // 获取具体的文件名称
            // console.log('单个文件3', reg.exec(key)) // 获取具体的文件名称
            // console.log('单个文件4', key) // 获取具体的文件名称
            // @ts-ignore
            app.component(reg.exec(key)[1], file)
        }
    })
}
