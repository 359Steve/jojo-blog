<script lang='ts' setup>

</script>

<template>
    <div class="relative w-full h-full">
        <div ref="wrapper" class="fixed top-0 w-full h-[100vh] z-[-1] bg-[white]">
            <canvas ref="el" class="w-full h-full"></canvas>
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