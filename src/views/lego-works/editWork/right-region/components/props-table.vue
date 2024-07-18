<template>

    <div class="props-table" v-for="(propMap, key) in propsBuild" :key="key">
        <template v-if="propMap">
            <div class="props-item" v-if="!propMap.isCombinationProp">
                <div class="item-label">{{ propMap?.label }}:</div>
                <div class="item-component">
                    <component :is="propMap.components" v-bind="propMap.extraProps"
                        v-on="propMap.extraEvents ? propMap.extraEvents : {}"
                        :value="formatValue(propMap.value!, propMap.reverseFormat)"
                        @update:value="update($event, key as string, propMap.reverseFormat)">
                    </component>
                </div>
            </div>
            <template v-else>
                <div class="props-item props-combiantion-item" v-for="(num) in propMap?.components.length" :key="num">
                    <div class="item-label">{{ propMap.label[num - 1] }}:</div>
                    <div class="item-component" v-if="propMap.combinationRules">
                        <component :is="propMap.components[num - 1]"
                            v-bind="propMap.extraProps && propMap.extraProps[num - 1] ? propMap.extraProps[num - 1] : undefined"
                            :value="formatValue(
                                (propMap.combinationRules(propMap.value!))[num - 1], propMap.reverseFormat[num - 1])"
                            @update:value="update($event, key as string, propMap.reverseFormat[num - 1], propMap.combinationRules, num - 1)">
                        </component>
                    </div>
                </div>
            </template>
        </template>
    </div>

</template>

<script setup lang='ts'>
import { PropsTableMap } from '@/type/template/widgetAndprops'
import { useStore } from '@/store/index'
import debounce from '@/utils/debounce'
import type { operatePropsLevel } from '@/type/widgets/index'

const $props = defineProps<{
    propsBuild: PropsTableMap,
    changeType: operatePropsLevel
}>()

const $store = useStore()

// 赋默认值时处理格式
const formatValue = (v: number | string, reverseFn?: (param: any) => any) => {
    // console.log('初始formatValue', v, reverseFn && reverseFn(v))
    return reverseFn ? reverseFn(v) : v
}

const debounceFn = debounce((finalValue: string | number, goalkey: string) => {
    // console.log('最终值', finalValue)
    // 存入记录，只需处理旧值
    $store.commit('editorStore/updateWidget', {
        changeKey: goalkey,
        changeValue: finalValue,
        changeType: $props.changeType
    })
    // 清空旧值
    $store.commit('editorStore/setCacheValue', '')
}, 500)

// 值修改，尝试直接修改仓库的属性
const update = (goalvalue: string | number, goalkey: string, reverseFn?: (param: any) => any, combinationRules?: any, combinationLayer?: number) => {
    // console.log('属性更新', goalvalue)
    // 需要在修改仓库前，便确定存入旧值，作为中间变量
    if (!$store.state.editorStore.cacheValue) {
        $store.commit('editorStore/setCacheValue', $props.changeType === 'page'
            ? $store.state.editorStore.page.props[goalkey]
            : $store.getters['editorStore/selectedWidget'].props[goalkey])
    }

    let newCompleteValue
    // 处理组合属性
    if (combinationRules) {
        // console.log('组合属性更新', goalvalue, combinationLayer)
        // 拼接出原来的完整值
        const completeValue = $props.changeType === 'page'
            ? $store.state.editorStore.page.props[goalkey]
            : $store.getters['editorStore/selectedWidget'].props[goalkey]
        const completeValueArr = combinationRules(completeValue)
        completeValueArr[combinationLayer!] = reverseFn!(goalvalue)
        newCompleteValue = completeValueArr.join(' ')
        // console.log('组合属性最终值', newCompleteValue)
    }

    const changeValue = newCompleteValue || (reverseFn ? reverseFn(goalvalue) : goalvalue)
    // 不存入记录
    $store.commit('editorStore/updateWidget', {
        changeKey: goalkey,
        changeValue,
        changeType: $props.changeType,
        widgetId: $props.changeType === 'page' ? '' : $store.state.editorStore.currentComponent,
        noRecord: true
    })

    // 实现防抖的方式可能需要指定时间再存入记录
    debounceFn(changeValue, goalkey, reverseFn)
}

</script>

<style scoped lang='scss'>
.props-table:not(:first-child) {
    // border: 1px solid red;
    margin-top: 18px;
}

.props-item {
    display: flex;
    gap: 0px;

    .item-label {
        width: 24%;
    }

    .item-component {
        flex-grow: 1;
    }
}

.props-combiantion-item {
    margin-top: 15px;
}
</style>
