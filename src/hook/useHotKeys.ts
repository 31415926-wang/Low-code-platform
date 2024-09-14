import { onMounted, onUnmounted } from 'vue'
import hotkeys, { KeyHandler } from 'hotkeys-js'

type Options = {
    scope?: string;
    element?: HTMLElement | null;
    keyup?: boolean | null;
    keydown?: boolean | null;
    capture?: boolean
    splitKey?: string;
    single?: boolean;
}

// 此hook主要是为了挂载与卸载事件
export default function useHotKeys(keys: string, callBack: KeyHandler, Options?: Options) {
    onMounted(() => {
        hotkeys(keys, { ...Options }, callBack)
    })
    onUnmounted(() => {
        hotkeys.unbind(keys)
    })
}
