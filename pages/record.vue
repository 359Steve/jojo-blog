<script lang='ts' setup>
definePageMeta({
    middleware: ['record']
})
onMounted(() => {
    useVueStarport().setIsRound(true)
})

onBeforeUnmount(() => {
    useVueStarport().setIsRound(false)
})
</script>

<template>
    <div class="w-full">
        <div class="w-full flex flex-col sm:flex-row items-center sm:items-start gap-4 py-4 sm:py-8">
            <div class="flex-shrink-0 flex items-center justify-start sm:h-full">
                <Starport port="my-id" class="w-[150px] aspect-square">
                    <RecordImage class="rounded-[50%] transition-all duration-1000" />
                </Starport>
            </div>
            <div class="flex-1 p-2 font-light indent-[2rem] text-justify">
                <span>
                    专注于 Vue 与 Nuxt 的前端开发，擅长构建高性能组件化项目，热爱使用 TypeScript 提升代码质量与开发体验。拥有从基础到实战的完整成长路径，熟练应用 Element
                    Plus、VueUse 等工具库，近期深入研究原子化 CSS，追求高效、优雅的前端工程实践。
                </span>
            </div>
        </div>

        <!-- 子页面 -->
        <NuxtPage />
    </div>
</template>

<style lang='scss' scoped></style>