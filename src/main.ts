import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setIcons } from '@/utils/setIcon'
import { useGlobalComponent } from '@/utils/setComponent'
import store from '@/store/index'
// 引入全局和初始样式
import '@/style/reset.css'
import '@/style/index.scss'
import '@/components/IconSvg/index' // svg-sprite-loader插件需要处理svg图片
// 修改ant全局的函数配置
import '@/utils/antConfig'

import {
    Button, ConfigProvider, Menu, Card, Row, Col, Divider, Image, Upload, Modal,
    Tooltip, Avatar, Tabs, Input, Slider, Radio, Select, Tag, InputNumber, Popconfirm,
    Empty, Collapse
} from 'ant-design-vue' // 自动按需引入

const app = createApp(App)

setIcons(app)// 按需在全局注册图标
useGlobalComponent(app)// 统一注册全局组件

app.use(Button).use(Menu).use(Card).use(Row).use(
    Col).use(Divider).use(Tooltip).use(Avatar).use(Tabs
    ).use(Upload).use(ConfigProvider).use(Input).use(Slider).use(Radio
    ).use(Select).use(Tag).use(InputNumber).use(Popconfirm).use(Image).use(Modal
    ).use(Empty).use(Collapse)

app.use(store)
app.use(router).mount('#app')
