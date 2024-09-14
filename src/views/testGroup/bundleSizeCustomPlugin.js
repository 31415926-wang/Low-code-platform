
// 自定义plugins
class BundleSizeCustomPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        console.log('自定义插件分析体积')
        compiler.hooks.compile.tap('test', (params) => {
            console.log('生命钩子compile')
        })
        compiler.hooks.afterCompile.tap('test', (params) => {
            console.log('生命钩子afterCompile')
        })
    }
}

module.exports = BundleSizeCustomPlugin
