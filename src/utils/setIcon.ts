/* eslint-disable */
import {
    PlusOutlined, PictureOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined, CopyOutlined,
    SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined, AppstoreOutlined, UnlockOutlined, ScheduleOutlined, VideoCameraOutlined,
    BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined, DragOutlined, ArrowUpOutlined, EyeOutlined, SwapOutlined, CloseOutlined
    , TeamOutlined, EllipsisOutlined, BorderlessTableOutlined, FormOutlined, DownloadOutlined, GiftOutlined, QuestionOutlined, BookOutlined
} from '@ant-design/icons-vue'
import type { App } from 'vue'

export function setIcons(app: App) {
    var iconsList = {
        PlusOutlined, PictureOutlined, RollbackOutlined, DeleteOutlined, EyeInvisibleOutlined, LockOutlined,
        CopyOutlined, SnippetsOutlined, UndoOutlined, RedoOutlined, UserOutlined, ArrowUpOutlined,
        AppstoreOutlined, BarsOutlined, SettingOutlined, BgColorsOutlined, FontSizeOutlined, VideoCameraOutlined,
        DragOutlined, UnlockOutlined, EyeOutlined, BookOutlined, ScheduleOutlined, CloseOutlined
        , SwapOutlined, TeamOutlined, BorderlessTableOutlined, EllipsisOutlined, FormOutlined, DownloadOutlined, GiftOutlined, QuestionOutlined
    }
    type keys = keyof typeof iconsList;
    for (const key in iconsList) {
        app.component(key, iconsList[key as keys])
    }
}




