const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const isProduct = process.env.NODE_ENV === 'production'
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const smpFn = (config) => {
  return isProduct ? smp.wrap(config) : config
}
// const mdLoader = require('./src/views/testGroup/mdLoader')
const BundleSizeCustomPlugin = require('./src/views/testGroup/BundleSizeCustomPlugin')

const configObj = defineConfig({
  publicPath: isProduct ? '/Low-code-platform' : '/',
  outputDir: isProduct ? 'docs' : 'dist',
  transpileDependencies: true,
  // 解决scss样式传入共享的全局变量找不到的问题，引入的全局变量文件不要包含其它内容（根据vue-cli官网）
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/style/scssVariable.scss";'
      }
    }
  },
  // 生产环境才有效
  devServer: {
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_TARGET_URL,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_URL]: ''
        }
      }
    }
  },

  configureWebpack: smpFn({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          exclude: /node_modules/,
          use: {
            // loader: './src/views/testGroup/mdLoader',  //两种都可以
            loader: path.resolve(__dirname, 'src/views/testGroup/mdLoader'),
            // loader: mdLoader, //报错，可能webpack在这个配置项是按路径来的
            options: {
              testProp: true
            }
          }
        }
      ]
    },
    /* 默认配置中第三方库会打包在一个chunk-vendors中，分割后可以把这部分文件提取出来
    （拓展：chunk-common是多入口时用的） */
    optimization: {
      splitChunks: {
        minSize: 180 * 1024, // 大于该byte的代码块才会考虑是否添加到下面的分组
        chunks: 'all',
        cacheGroups: {
          antVendor: { // 前面的key只是区分，下面的name才是分割后的文件名
            name: 'ant-design-vue',
            test: /[\\/]node_modules[\\/](ant-design-vue)[\\/]/
          },
          canvasVendor: {
            name: 'html2canvas',
            test: /[\\/]node_modules[\\/](html2canvas)[\\/]/
          },
          momentVendor: {
            name: 'moment',
            test: /[\\/]node_modules[\\/](moment)[\\/]/
          }
        }
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      }),
      ...(isProduct
        ? [new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false // 不自动打开浏览器
        })]
        : []),
      ...(isProduct
        ? [new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240 // 只有大于 10kb 的文件才会被压缩，插件的作用是生成一份压缩文件，在客户端会请求该压缩文件，以减少流量和等待时间。但是需浏览器支持，所以源文件一般也会保留
        })]
        : []),
      new BundleSizeCustomPlugin({
        testProp: true
      })
    ],
    // moment.js在ant-design-vue被引入，但是没有使用
    // externals: {
    //   moment: 'moment'
    // },
    // 在对象中用对象解构，数组用数组解构
    ...(
      isProduct
        ? {
          cache: {
            type: 'filesystem',
            name: 'vue3-item' // 自定义生成的缓存文件夹名称
          }
        }
        : {}),
    devServer: {
      client: {
        overlay: false // 避免错误覆盖全屏
      }
    }
  }),
  // 比configureWebpack晚执行
  chainWebpack: (config) => {
    /* 修改html插件时，直接合并对原配置不会有影响，反而是调用两次插件 */
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '智慧乐高'
        return args
      })

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
  }
})

module.exports = configObj
