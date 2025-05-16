<script lang='ts' setup>

</script>

<template>
    <ErrorMain>
        <template #error>
            <div class="w-full sm:w-10/12 md:w-8/12 text-center">
                <div class="bg-[url(~/assets/image/404-ezgif.com-gif-maker.gif)] h-[250px] sm:h-[350px] md:h-[400px] bg-center bg-no-repeat bg-contain">
                    <h1 class="text-center text-6xl sm:text-7xl md:text-8xl pt-6 sm:pt-8">
                        404
                    </h1>
                </div>

                <div class="mt-[-50px]">
                    <h3 class="text-2xl sm:text-3xl font-bold mb-4">
                        Look like you're lost
                    </h3>
                    <p class="mb-6 sm:mb-5">
                        The page you are looking for is not available!
                    </p>

                    <ElButton type="primary" class="my-5" @click="navigateTo({ replace: true, path: '/' })">
                        回到首页
                    </ElButton>
                </div>
            </div>
        </template>
    </ErrorMain>
</template>

<style lang='postcss' scoped>
:deep(.el-button) {
    @apply bg-black dark:bg-[white] text-white dark:text-black
}
</style>