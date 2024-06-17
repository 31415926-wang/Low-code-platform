<template>
    <!-- 根据Props表单的模版进行渲染 -->
    <div class="type-box" v-for="(propsType, index) in propsTemplate" :key="index">
        <h4 class="type-box-title">{{ propsType.label }}</h4>
        <!-- 遍历对象 -->
        <div class="props-item" v-for="(item, key) in propsType.build" :key="key">
            <div class="item-label">{{ item?.label }}:</div>
            <div class="item-component" v-if="item">
                <component :is="item.components" v-bind="item.extraProps ? item.extraProps : undefined"
                    :value="formatValue(item.value!, item.reverseFormat)"
                    @update:value="update($event, key, item.reverseFormat)">
                </component>
            </div>
        </div>
    </div>

    <!-- <pre>
        {{ propsTemplate }}
    </pre> -->

</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store/index'
import { propsToFormFn } from '@/widgets/propsTableMap'

const $store = useStore()

// 渲染的props模版
const propsTemplate = computed(() => {
    return $store.getters['editorStore/selectedWidget']
        ? propsToFormFn($store.getters['editorStore/selectedWidget'].props)
        : []
})

// 赋默认值时处理格式
const formatValue = (v: number | string, reverseFn?: (param: any) => any) => {
    return reverseFn ? reverseFn(v) : v
}

// 值修改，尝试直接修改仓库的属性
const update = (goalvalue: string | number, goalkey: string, reverseFn?: (param: any) => any) => {
    console.log('新值', goalvalue)

    $store.commit('editorStore/updateWidget', {
        changeKey: goalkey,
        changeValue: reverseFn ? reverseFn(goalvalue) : goalvalue
    })
}

</script>

<style scoped lang='scss'>
.type-box {
    margin-bottom: 19px;

    .props-item {
        display: flex;
        gap: 0px;
        margin-top: 15px;

        .item-label {
            width: 24%;
        }

        .item-component {
            flex-grow: 1;
        }
    }

    .type-box-title {
        // display: inline-block;
        position: relative;
        color: rgba(255, 166, 0, 0.9);
        background: rgba(245, 245, 245, 0.679);
        border-radius: 5px;
        padding: 5px 20px;
        font-size: 15px;

        &::before {
            position: absolute;
            top: 5px;
            left: 3%;
            content: '';
            width: 3px;
            height: 65%;
            background-color: orange
        }
    }
}
</style>
