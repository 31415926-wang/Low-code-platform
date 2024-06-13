import { computed } from 'vue'
import { pick } from 'lodash-es'

// 抽离物料组件内部的业务
export default function <T>(props: Readonly<T>, styleKeys: string[]) {
    // 从props找出styleProps，避免在style属性上添加无关属性
    const styleProps = computed(() => pick(props, styleKeys))
    return {
        styleProps
    }
}
