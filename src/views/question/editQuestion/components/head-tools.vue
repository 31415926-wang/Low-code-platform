<template>

    <TooltipButton icon='DeleteOutlined' tip="删除"></TooltipButton>
    <TooltipButton icon='EyeInvisibleOutlined' tip="隐藏"></TooltipButton>
    <TooltipButton icon='LockOutlined' tip="解锁/锁定" type="primary"></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='CopyOutlined' tip="复制"></TooltipButton>
    <TooltipButton icon='SnippetsOutlined' tip="粘贴" disabled></TooltipButton>

    <a-divider class="divider" type="vertical" />

    <TooltipButton icon='UndoOutlined' tip="撤销"></TooltipButton>
    <TooltipButton icon='RedoOutlined' tip="重做" disabled></TooltipButton>

</template>

<script setup lang='ts'>

/*

*/
</script>

<style scoped lang='scss'>
.divider{
    height: 100%;
    margin: 0px;
}
</style>
