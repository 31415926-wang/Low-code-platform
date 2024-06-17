import { onMounted, onUnmounted } from 'vue'
import hotkeys, { HotkeysEvent } from 'hotkeys-js'

// 此hook主要是为了挂载与卸载事件
export default function useHotKeys(keys: string, callBack: (param1?: KeyboardEvent, param2?: HotkeysEvent) => void) {
    onMounted(() => {
        hotkeys(keys, function (event: KeyboardEvent, handler: HotkeysEvent) {
            event.preventDefault()
            callBack(event, handler)
        })
    })
    onUnmounted(() => {
        hotkeys.unbind(keys)
    })
}
