<template>
    <div class="container">
        <div class="heard">

            <Head></Head>
        </div>
        <div class="main">
            <Main></Main>
        </div>
        <div class="footer">
            <Footer></Footer>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Head from './head.vue'
import Main from './main.vue'
import Footer from './footer.vue'

</script>

<style scoped lang='scss'>

$box_padding: 16px 20px;

.container {
    background: url('@/assets/image/appBg.svg');
    height: 100%;

    .heard {
        height: $head_height;
        padding: $box_padding;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);

        &>* {
            height: 100%;
        }
    }

    .main {
        height: calc(100% - $head_height - $footer_height - 2px);
        padding: $box_padding;
        padding-bottom: 0;
        overflow: hidden;
    }

    .footer {
        height: $footer_height;
    }

}
</style>
