<template>
    <a-row class="">
        <a-col :span="5" :xxl="4">
            <div class="shadow-card">
                <leftRegion></leftRegion>
            </div>
        </a-col>
        <a-col :span="2" :xxl="5"></a-col>
        <a-col class="middle-col" :span="8" :xxl="6">
            <middleRegion></middleRegion>
        </a-col>
        <a-col :span="2" :xxl="4"></a-col>
        <a-col :span="7" :xxl="5">
            <div class="shadow-card">
                <rightRegion></rightRegion>
            </div>
        </a-col>
    </a-row>
</template>

<script setup lang='ts'>
import leftRegion from './left-region/left-region.vue'
import rightRegion from './right-region/right-region.vue'
import middleRegion from './components/middle-region.vue'

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
        padding: 27px 0;
    }
}

::v-deep .ant-tabs .ant-tabs-tab .anticon {
    margin-right: 5px;
}
</style>
