<template>
    <a-row style="height: 100%;">
        <a-col :span="7" :xl="6" :xxl="4">
            <div class="shadow-card left-col relative">
                <leftRegion></leftRegion>
            </div>
        </a-col>
        <a-col :span="0" :xl="0" :xxl="2"></a-col>
        <a-col class="middle-col hidden-scrollbar" :span="10" :xl="12" :xxl="12">
            <a-spin :spinning="readWorkLoading" size="large" tip="读取中">

                <!-- 手机头部 -->
                <div class="middle-region-wrapper">
                    <div ref="iphoneHeadRef" class="iphone-head">
                        <img :src="iphoneHeadImgUrl" alt="">
                    </div>
                    <div class="iphone-tip"></div>
                    <div class="scroll-top" @click="scrollToTop" v-show="displayTopBt">
                        <ArrowUpOutlined />
                    </div>
                    <middleRegion></middleRegion>
                </div>
            </a-spin>
        </a-col>
        <a-col :span="0" :xl="0" :xxl="1"></a-col>
        <a-col :span="7" :xl="6" :xxl="5">
            <div class="shadow-card right-col relative">
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
import { onMounted, ref, watch } from 'vue'
import { useStore } from '@/store/index'
import { useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
// @ts-ignore
import iphoneHeadImgUrl from '@/assets/image/phone-head.png'
import { useElementVisibility } from '@vueuse/core'

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

// 回滚到顶部
const iphoneHeadRef = ref(null)
const iphoneHeadVisibility = useElementVisibility(iphoneHeadRef) // 快捷判断元素在不在视口
const displayTopBt = ref(false)

const scrollToTop = () => {
    const editorBoxDom = document.querySelector('.middle-col')
    if (editorBoxDom) {
        editorBoxDom.scrollTop = 0
    }
}
watch(iphoneHeadVisibility, (val) => {
    displayTopBt.value = !val
})

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

    .ant-col {
        height: 100%;
    }

    .ant-col>* {
        height: 100%;

        .shadow-card>* {
            height: 100%;
        }
    }

    .middle-col {
        display: flex;
        justify-content: center;
        height: 100%;
        // height: 100vh;
        // padding: 27px 0px;
        overflow-x: visible;
        overflow-y: auto;
    }
}

::v-deep .ant-tabs .ant-tabs-tab .anticon {
    margin-right: 5px;
}

.middle-region-wrapper {
    position: relative;
    width: max-content;
    width: 470px;

    .iphone-head {
        padding: 25px 0 0 1px;
    }

    .iphone-tip {
        position: absolute;
        left: -150px;
        top: 667px;
        border-top: 1px solid rgb(161, 161, 161);
        width: 150px;

        &::before {
            position: absolute;
            bottom: 0;
            content: 'iphone6/7/8手机高度';
            opacity: 0.8;
            padding-bottom: 5px;
        }
    }

    .scroll-top {
        position: fixed;
        bottom: 10%;
        left: 70%;
        font-size: 19px;
        color: white;
        background-color: rgb(109, 109, 109);
        border-radius: 50%;
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background-color: $theme_color;
        }
    }
}

@media screen and (max-width:1600px) {
    .middle-region-wrapper {
        width: 440px;
    }
}
@media screen and (max-width:1280px) {
    .middle-region-wrapper {
        width: 420px;
    }
}

@media screen and (max-width:1024px) {
    .middle-region-wrapper {
        width: 360px;
    }
}
</style>
