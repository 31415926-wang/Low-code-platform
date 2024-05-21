const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')

const configObj = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    // 添加 svg loader
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule.test(/\.svg$/)
    //   .include.add(path.resolve(__dirname, './src/assets/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()

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
