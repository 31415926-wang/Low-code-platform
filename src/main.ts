import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setIcons } from '@/utils/setIcon'
import { useGlobalComponent } from '@/utils/setComponent'
import store from '@/store/index'
import QuestionStarBricks from 'question-star-bricks'
import 'question-star-bricks/dist/outputScss.css'
// 引入全局和初始样式
import '@/style/reset.css'
import '@/style/index.scss'
import '@/components/IconSvg/index' // svg-sprite-loader插件需要处理svg图片
// 修改ant全局的函数配置
import '@/utils/antConfig'

// ant-design-vue的组件按需引入
import antDesignImport from '@/utils/antDesignImport'

const app = createApp(App)

setIcons(app)// 按需在全局注册图标
useGlobalComponent(app)// 统一注册全局组件

app.use(store)
// console.log('全局注入仓库')

/* 当组件库的vue和主项目的vue版本一致时，就不会有app类型问题 */
app.use(QuestionStarBricks)
app.use(antDesignImport) // 简写方法，相当于直接调用函数传入app
app.use(router).mount('#app')
