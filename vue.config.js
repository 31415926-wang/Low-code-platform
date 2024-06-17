const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')

const configObj = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 有一些svg不加入处理
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[folder]-[name]',
        svgo: {
          plugins: [
            {
              removeViewBox: false
            }
          ]
        }
      })
      .end()
  },
  // 解决scss样式传入共享的全局变量找不到的问题，引入的全局变量文件不要包含其它内容（根据vue-cli官网）
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/style/scscsVariable.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
    ]

  }
})

module.exports = configObj
