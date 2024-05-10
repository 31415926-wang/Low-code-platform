import { computed } from 'vue'
import { pick } from 'lodash-es'

// 抽离物料组件内部的业务
export default function <T>(props: Readonly<T>, styleKeys: string[]) {
    // 从props找出styleProps
    const styleProps = computed(() => pick(props, styleKeys))
    return {
        styleProps
    }
}
