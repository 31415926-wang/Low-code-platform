<template>
    <a-row style="height: 100%; ">
        <a-col :span="5" :xxl="4">
            <div class="shadow-card relative">
                <leftRegion></leftRegion>
            </div>
        </a-col>
        <a-col :span="2" :xxl="5"></a-col>
        <a-col class="middle-col" :span="8" :xxl="6">
            <middleRegion></middleRegion>
        </a-col>
        <a-col :span="2" :xxl="4"></a-col>
        <a-col :span="7" :xxl="5">
            <div class="shadow-card custom-scrollbar relative">
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

addHotKeys() // 为编辑器注册快捷键

</script>

<style scoped lang='scss'>
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
