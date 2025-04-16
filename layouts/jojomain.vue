<script lang='ts' setup>

</script>

<template>
    <div class="relative w-full h-full">
        <div class="fixed top-0 w-full h-[100vh] z-9">
            <!-- <canvas ref="el" width="1000" height="2000"></canvas> -->
        </div>
        <div class="w-full h-full">
            <!-- 导航栏 -->
            <HeaderBox></HeaderBox>
            <slot name="page"></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>