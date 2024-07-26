<template>
    <a-row style="height: 100%; ">
        <a-col :span="5" :xxl="4">
            <div class="shadow-card left-col relative">
                <leftRegion></leftRegion>
            </div>
        </a-col>
        <a-col :span="2" :xxl="5"></a-col>
        <a-col class="middle-col" :span="8" :xxl="6">

            <a-spin :spinning="readWorkLoading" size="large" tip="读取中">
                <middleRegion></middleRegion>
            </a-spin>

        </a-col>
        <a-col :span="2" :xxl="4"></a-col>
        <a-col :span="7" :xxl="5">
            <div class="shadow-card right-col custom-scrollbar relative">
                <rightRegion></rightRegion>
            </div>
        </a-col>
    </a-row>
</template>

<script setup lang='ts'>
import leftRegion from './left-region/left-region.vue'
import rightRegion from './right-region/right-region.vue'
import middleRegion from './middle-region/middle-region.vue'
import addHotKeys from '@/plugins/hotKeys'
import contextMenu, { MenuListItem } from '@/plugins/contextMenu'
import { onMounted, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'

addHotKeys() // 为编辑器注册快捷键

const $store = useStore()
const $route = useRoute()

const readWorkLoading = ref(false)

// 右键鼠标功能
const menuList = ref<MenuListItem[]>([
    {
        name: '拷贝图层',
        tip: '⌘C / Ctrl+C',
        fn: () => {
            $store.commit('editorStore/copyComponent')
        }
    },
    {
        name: '粘贴图层',
        tip: '⌘V / Ctrl+V',
        fn: () => {
            $store.commit('editorStore/pasteComponent')
        }
    },
    {
        name: '删除图层',
        tip: 'Backspace / Delete',
        fn: () => {
            $store.commit('editorStore/deleteWidget', {})
        }
    },
    {
        name: '取消选中',
        tip: 'ESC',
        fn: () => {
            $store.commit('editorStore/selectWidget', '')
        }
    }
])
contextMenu(menuList.value, '.edit-wrapper')

onMounted(() => {
    readWorkLoading.value = true
    const result = $store.dispatch('editorStore/readWork', $route.params.id)
    result.then(() => {
        //
    }).catch(() => {
        message.error('读取作品信息出错，请重新刷新页面!')
    }).finally(() => {
        readWorkLoading.value = false
    })
})

</script>

<style scoped lang='scss'>
// 调整编辑器读取加载中
::v-deep() .ant-spin {
    max-height: 100% !important;
}

::v-deep() .ant-spin-container {
    height: 100%;
}

::v-deep() .ant-spin-nested-loading .ant-spin-blur {
    height: 100%;
}

.ant-row {
    height: 100%;

    .shadow-card {
        padding-top: 0px;
    }

    .ant-col>* {
        height: 100%;

        .shadow-card>* {
            height: 100%;
        }
    }

    .middle-col {
        height: 100%;
        padding: 27px 0;
    }
}

::v-deep .ant-tabs .ant-tabs-tab .anticon {
    margin-right: 5px;
}
</style>
