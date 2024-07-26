<template>
    <div class="index-box">
        <div class="index-content">
            <a-row>
                <a-col :span="4" :xxl="3">
                    <Nav></Nav>
                </a-col>
                <a-col :span="0" :xxl="1"></a-col>
                <a-col :span="20" :xxl="20">
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
        width: 71%;
        display: flex;

        .ant-row {
            width: 100%;

            .ant-col {
                height: 100%
            }

            .ant-col>* {
                height: 100%;
            }
        }
    }
}

@media screen and (max-width:1550px) {
    .index-box {
        .index-content {
            width: 92%;
        }
    }
}
</style>
