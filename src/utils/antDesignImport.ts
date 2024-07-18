import type { App } from 'vue'

import {
    Button, ConfigProvider, Menu, Card, Row, Col, Divider, Image, Upload, Modal,
    Tooltip, Avatar, Tabs, Input, Slider, Radio, Select, Tag, InputNumber, Popconfirm,
    Empty, Collapse, Form, Checkbox, Pagination
} from 'ant-design-vue' // 自动按需引入

export default function antDesignImport(app: App) {
    app.use(Button).use(Menu).use(Card).use(Row).use(
        Col).use(Divider).use(Tooltip).use(Avatar).use(Tabs
        ).use(Upload).use(ConfigProvider).use(Input).use(Slider).use(Radio
        ).use(Select).use(Tag).use(InputNumber).use(Popconfirm).use(Image).use(Modal
        ).use(Empty).use(Collapse).use(Form).use(Checkbox).use(Pagination)
}
