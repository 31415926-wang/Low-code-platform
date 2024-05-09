<template>
    <div class="index-box">
        <div class="index-content">
            <a-row>
                <a-col :span="5" :xxl="3">
                    <Nav></Nav>
                </a-col>
                <a-col :span="19" :xxl="21">
                    <Content></Content>
                </a-col>
            </a-row>
        </div>

    </div>

</template>
<script lang="ts" setup>
import Nav from './components/nav.vue'
import Content from './components/content.vue'

</script>

<style scoped lang='scss'>
.index-box {
    height: 100%;
    padding-top: 6px;

    .index-content {
        height: 100%;
        margin: 0 auto;
        width: 80%;
        display: flex;

        .ant-row {
            width: 100%;

            .ant-col>* {
                height: 100%;
            }
        }
    }
}
</style>
