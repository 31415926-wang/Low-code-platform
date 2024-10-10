<template>
    <div class="main-box ">
        <!-- <transition name="fade">
            <router-view></router-view>
        </transition> -->
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.main-box {
    height: 100%;
    overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-active {
    display: none;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
