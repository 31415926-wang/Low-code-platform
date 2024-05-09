import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setIcons } from '@/utils/setIcon'
import { useGlobalComponent } from '@/components/index'
import store from '@/store/index'
// 引入全局和初始样式
import '@/style/reset.css'
import '@/style/index.scss'

import { Button, ConfigProvider, Menu, Card, Row, Col, Divider, Tooltip, Avatar, Tabs } from 'ant-design-vue' // 自动按需引入

const app = createApp(App)

setIcons(app)// 按需在全局注册图标
useGlobalComponent(app)// 统一注册全局组件

app.use(Button)
app.use(Menu)
app.use(Card)
app.use(Row)
app.use(Col)
app.use(Divider)
app.use(Tooltip)
app.use(Avatar)
app.use(Tabs)
app.use(ConfigProvider)
app.use(store)
app.use(router).mount('#app')
