/* eslint-disable */
import {
    PlusOutlined, PictureOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined, CopyOutlined,
    SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined, AppstoreOutlined, UnlockOutlined,
    BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined, DragOutlined, EyeOutlined

} from '@ant-design/icons-vue'
import type { App } from 'vue'

export function setIcons(app: App) {
    var iconsList = {
        PlusOutlined, PictureOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined,
        CopyOutlined, SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined,
        AppstoreOutlined, BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined,
        DragOutlined, UnlockOutlined, EyeOutlined
    }
    type keys = keyof typeof iconsList;
    for (const key in iconsList) {
        app.component(key, iconsList[key as keys])
    }
}




