<script lang='ts' setup>
onMounted(() => {
    useVueStarport().setIsRound(true)
})

onBeforeUnmount(() => {
    useVueStarport().setIsRound(false)
})
</script>

<template>
    <div class="w-full">
        <div class="w-full grid mobile-pad:grid-cols-3 gap-4">
            <div class="w-full flex justify-center items-center">
                <Starport port="my-id" class="w-24 h-24">
                    <RecordImage class="rounded-[50%] transition-all duration-1000" />
                </Starport>
            </div>
            <div class="mobile-pad:col-span-2 grid grid-cols-1">
                <div class="w-full p-2 flex justify-center items-cente break-normalr indent-[2rem] font-light">
                    <span>专注于 Vue 与 Nuxt 的前端开发，擅长构建高性能组件化项目，热爱使用 TypeScript 提升代码质量与开发体验。拥有从基础到实战的完整成长路径，熟练应用 Element Plus、VueUse 等工具库，近期深入研究原子化 CSS，追求高效、优雅的前端工程实践。</span>
                </div>
            </div>
        </div>
        <!-- 子页面 -->
        <NuxtPage />
    </div>
</template>

<style lang='scss' scoped></style>