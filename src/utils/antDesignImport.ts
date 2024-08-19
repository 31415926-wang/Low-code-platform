import type { App } from 'vue'

import {
    Button, ConfigProvider, Menu, Card, Row, Col, Divider, Image, Upload, Modal,
    Tooltip, Avatar, Tabs, Input, Slider, Radio, Select, Tag, InputNumber, Popconfirm, Anchor,
    Empty, Collapse, Form, Checkbox, Pagination, Skeleton, Table, Spin, Tour, Space, Drawer
} from 'ant-design-vue' // 自动按需引入

export default function antDesignImport(app: App) {
    app.use(Button).use(Menu).use(Card).use(Row).use(
        Col).use(Divider).use(Tooltip).use(Avatar).use(Tabs
        ).use(Upload).use(ConfigProvider).use(Input).use(Slider).use(Radio
        ).use(Select).use(Tag).use(InputNumber).use(Popconfirm).use(Image).use(Modal
        ).use(Empty).use(Collapse).use(Form).use(Checkbox).use(Pagination
        ).use(Skeleton).use(Table).use(Spin).use(Tour).use(Space).use(Drawer).use(Anchor)
}

/* 默认暴露的一个方法自动认为是install/{install:xx}，如果直接简写成app.use()，
 相当于直接调用函数并传入app */
