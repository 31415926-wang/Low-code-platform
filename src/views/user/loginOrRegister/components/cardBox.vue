<template>
    <div class="card-box">
        <div class="card-form">
            <div class="card-title">
                <slot name="title"></slot>
            </div>
            <slot name="form"></slot>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { } from 'vue'

</script>

<style scoped lang='scss'>
.card-box {
    position: relative;
    height: 100%;

    .card-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        padding: 45px;
        border-radius: 30px;
        background-color: #faf8f7;
        box-shadow: 0 0 2px rgb(187, 186, 186);

        .card-title {
            text-align: center;
            font-weight: 600;
            font-size: 22px;
        }

        &>*:not(:last-child) {
            margin-bottom: 20px;
        }
    }
}

::v-deep() .ant-form-item {
    margin-bottom: 17px;
}
</style>
