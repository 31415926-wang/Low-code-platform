import { StyleValue, computed } from 'vue'
import { pick } from 'lodash-es'

// 如果是带-的，转为驼峰
function handleHumpNameArr(arr: string[]) {
    return arr.map((item: string) => {
        const msgIndex = item.indexOf('-')
        if (msgIndex === -1) {
            return item
        } else {
            const itemArr = item.split('')
            itemArr.splice(msgIndex, 2, itemArr[msgIndex + 1].toLocaleUpperCase())
            return itemArr.join('') // join()默认是,
        }
    })
}

// 抽离物料组件内部的业务
export default function <T>(props: Readonly<T>, styleKeys: string[]) {
    // 从props找出styleProps，避免在style属性上添加无关属性
    // styleKeys需转为驼峰，因为props通过组件传过来时已变为驼峰
    const humpNameStyleKes = handleHumpNameArr(styleKeys)

    const styleProps = computed<StyleValue>(() => pick(props, humpNameStyleKes))
    return {
        styleProps
    }
}
