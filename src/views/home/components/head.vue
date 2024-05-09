<template>
    <div class="index-head-box">
        <div class="logo">
            ✨问卷星
        </div>
        <div class="user">
            <a-avatar :size="35">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
            管理员
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.index-head-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &>.logo {
        font-size: 32px;
        font-weight: bold;
    }

    &>.user {
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 20px;
    }
}
</style>
