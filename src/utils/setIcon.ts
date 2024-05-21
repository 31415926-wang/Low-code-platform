/* eslint-disable */
import {
    PlusOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined, CopyOutlined,
    SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined, AppstoreOutlined,
    BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined,
    
} from '@ant-design/icons-vue'
import type { App } from 'vue'

export function setIcons(app: App) {
    var iconsList = {
        PlusOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined,
        CopyOutlined, SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined,
        AppstoreOutlined, BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined,
        

    }
    type keys = keyof typeof iconsList;
    for (const key in iconsList) {
        app.component(key, iconsList[key as keys])
    }
}




