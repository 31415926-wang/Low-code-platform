{
  mode: 'development',
  context: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star',
  output: {
    hashFunction: 'xxhash64',
    path: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\src',
      vue$: 'vue/dist/vue.runtime.esm-bundler.js'
    },
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules',
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\@vue+cli-service@5.0.8_@vue+compiler-sfc@3.4.38_sass-loader@14.2.0_vue@3.4.38\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\@vue+cli-plugin-typescript@5.0.8_@vue+cli-service@5.0.8_eslint@7.32.0_typescript@4.5.5_vue@3.4.38\\node_modules\\@vue\\cli-plugin-typescript\\node_modules',
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\@vue+cli-plugin-babel@5.0.8_@vue+cli-service@5.0.8_core-js@3.36.1_vue@3.4.38\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules',
      'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\@vue+cli-service@5.0.8_@vue+compiler-sfc@3.4.38_sass-loader@14.2.0_vue@3.4.38\\node_modules\\@vue\\cli-service\\node_modules'
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('esm') */
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-loader@17.4.2_@vue+compiler-sfc@3.4.38_vue@3.4.38_webpack@5.91.0\\node_modules\\vue-loader\\dist\\index.js',
            options: {
              cacheDirectory: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '9ddc86fe',
              babelParserPlugins: [
                'jsx',
                'classProperties',
                'decorators-legacy'
              ]
            }
          }
        ]
      },
      /* config.module.rule('vue-style') */
      {
        test: /\.vue$/,
        resourceQuery: /type=style/,
        sideEffects: true
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        },
        exclude: [
          'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\src\\assets\\icons'
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  additionalData: '@import "~@/style/scssVariable.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  additionalData: '@import "~@/style/scssVariable.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  additionalData: '@import "~@/style/scssVariable.scss";'
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  additionalData: '@import "~@/style/scssVariable.scss";'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\sass-loader@14.2.0_sass@1.75.0_webpack@5.91.0\\node_modules\\sass-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                    auto: () => true
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue-style-loader@4.1.3\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: false,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\css-loader@6.11.0_webpack@5.91.0\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false,
                  importLoaders: 2
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\postcss-loader@6.2.1_postcss@8.4.38_webpack@5.91.0\\node_modules\\postcss-loader\\dist\\cjs.js',
                options: {
                  sourceMap: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\babel-loader@8.3.0_@babel+core@7.24.4_webpack@5.91.0\\node_modules\\babel-loader\\lib\\index.js',
            options: {
              cacheCompression: false,
              cacheDirectory: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '7158b782'
            }
          }
        ]
      },
      /* config.module.rule('ts') */
      {
        test: /\.ts$/,
        use: [
          /* config.module.rule('ts').use('babel-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\babel-loader@8.3.0_@babel+core@7.24.4_webpack@5.91.0\\node_modules\\babel-loader\\lib\\index.js'
          },
          /* config.module.rule('ts').use('ts-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\ts-loader@9.5.1_typescript@4.5.5_webpack@5.91.0\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx$/,
        use: [
          /* config.module.rule('tsx').use('babel-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\babel-loader@8.3.0_@babel+core@7.24.4_webpack@5.91.0\\node_modules\\babel-loader\\lib\\index.js'
          },
          /* config.module.rule('tsx').use('ts-loader') */
          {
            loader: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\ts-loader@9.5.1_typescript@4.5.5_webpack@5.91.0\\node_modules\\ts-loader\\index.js',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsxSuffixTo: [
                '\\.vue$'
              ]
            }
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\src\\assets\\icons'
        ],
        use: [
          /* config.module.rule('icons').use('svg-sprite') */
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[folder]-[name]',
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  optimization: {
    realContentHash: false,
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new Plugin(),
    /* config.plugin('feature-flags') */
    new DefinePlugin(
      {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_BASE_URL: '"/dev"',
          VUE_APP_BUILD_URL: '"http://localhost:3000"',
          VUE_APP_STATIC_URL: '"https://static.imooc-lego.com/"',
          VUE_APP_TARGET_URL: '"https://api.imooc-lego.com"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'question-star',
        scriptLoading: 'defer',
        templateParameters: function () { /* omitted long function */ },
        template: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\public\\index.html'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      {
        patterns: [
          {
            from: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\public',
            to: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\dist',
            toType: 'dir',
            noErrorOnMissing: true,
            globOptions: {
              ignore: [
                '**/.DS_Store',
                'D:/Users/Desktop/个人学习/自学项目/低代码平台/questionn-star/question-star/public/index.html'
              ]
            },
            info: {
              minimized: true
            }
          }
        ]
      }
    ),
    /* config.plugin('eslint') */
    new ESLintWebpackPlugin(
      {
        extensions: [
          '.js',
          '.jsx',
          '.vue',
          '.ts',
          '.tsx'
        ],
        cwd: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star',
        cache: true,
        cacheLocation: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.cache\\eslint\\e9179234.json',
        context: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star',
        failOnWarning: false,
        failOnError: true,
        eslintPath: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\eslint@7.32.0\\node_modules\\eslint',
        formatter: 'stylish'
      }
    ),
    /* config.plugin('fork-ts-checker') */
    new ForkTsCheckerWebpackPlugin(
      {
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: 'D:\\Users\\Desktop\\个人学习\\自学项目\\低代码平台\\questionn-star\\question-star\\node_modules\\.pnpm\\vue@3.4.38_typescript@4.5.5\\node_modules\\vue\\compiler-sfc\\index.js'
            }
          },
          diagnosticOptions: {
            semantic: true,
            syntactic: false
          }
        }
      }
    ),
    {
      definitions: {
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      }
    },
    {
      opts: {
        analyzerMode: 'static',
        analyzerHost: '127.0.0.1',
        reportFilename: null,
        reportTitle: function () { /* omitted long function */ },
        defaultSizes: 'parsed',
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        excludeAssets: null,
        logLevel: 'info',
        startAnalyzer: true,
        analyzerUrl: function () { /* omitted long function */ },
        analyzerPort: 8888
      },
      server: null,
      logger: {
        activeLevels: new Set([
          'info',
          'warn',
          'error',
          'silent'
        ])
      }
    }
  ],
  entry: {
    app: [
      './src/main.ts'
    ]
  },
  externals: {
    moment: 'moment'
  },
  cache: {
    type: 'filesystem',
    name: 'vue3-item'
  },
  devServer: {
    client: {
      overlay: false
    }
  }
}

D:\Users\Desktop\个人学习\自学项目\低代码平台\questionn-star\question-star>