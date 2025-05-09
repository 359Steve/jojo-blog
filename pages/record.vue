<script lang='ts' setup>
import type { RecordButtonList } from '~/types/com-types'

definePageMeta({
    middleware: ['record']
})

const recordButtonList = reactive<RecordButtonList[]>(
    [
        { id: 1, icon: 'ri-bilibili-fill', title: 'BiliBili', href: 'https://space.bilibili.com/457627448?spm_id_from=333.1007.0.0' },
        { id: 2, icon: 'ri-facebook-fill', title: 'GitHub', href: 'https://github.com/359Steve' },
        { id: 3, icon: 'ri-github-line', title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61565513711985' }
    ]
)

onMounted(() => {
    useVueStarport().setIsRound(true)
})

onBeforeUnmount(() => {
    useVueStarport().setIsRound(false)
})
</script>

<template>
    <div class="w-full">
        <div class="w-full grid grid-cols-1 gap-4">
            <div class="w-full flex justify-center items-center">
                <Starport
                    port="my-id"
                    class="aspect-square w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
                >
                    <RecordImage class="rounded-[50%] transition-all duration-1000" />
                </Starport>
            </div>
            <div class="w-full flex items-center justify-center">
                <AnimationRevealOnScroll :base-class="'flex items-center justify-center'">
                    <span class="text-center text-gray-400">
                        努力做一个摆脱CV的前端工程师
                    </span>
                </AnimationRevealOnScroll>
            </div>
            <div class="w-full flex items-center justify-center gap-2">
                <AnimationRevealOnScroll v-for="item in recordButtonList" :key="item.id" :base-class="'w-fit'">
                    <a :href="item.href" class="button">
                        <ElButton size="default">
                            <template #icon>
                                <div><i :class="item.icon" class="text-sm"></i></div>
                            </template>
                            <span>{{ item.title }}</span>
                        </ElButton>
                    </a>
                </AnimationRevealOnScroll>
            </div>
        </div>

        <!-- 子页面 -->
        <NuxtPage />
    </div>
</template>

<style lang='postcss' scoped>
:deep(.el-button) {
    @apply text-gray-400 hover:text-black hover:bg-gray-400/20
}
</style>