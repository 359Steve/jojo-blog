<script lang='ts' setup>
import type { RecordButtonList } from '~/types/com-types'

const recordButtonList = reactive<RecordButtonList[]>(
    [
        { id: 1, icon: 'ri-bilibili-fill', title: 'BiliBili', href: 'https://space.bilibili.com/457627448?spm_id_from=333.1007.0.0' },
        { id: 2, icon: 'ri-facebook-fill', title: 'GitHub', href: 'https://github.com/359Steve' },
        { id: 3, icon: 'ri-github-line', title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61565513711985' }
    ]
)
</script>

<template>
    <div class="w-full mb-12 sm:mb-20">
        <div class="flex sm:flex-row flex-col space-x-0 sm:space-x-10 relative">
            <div class="w-full sm:w-40 flex items-center justify-center sm:justify-normal mb-4 sm:mb-0">
                <Starport
                    port="my-id"
                    class="aspect-square w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
                >
                    <RecordImage class="rounded-[50%] transition-all duration-1000" />
                </Starport>
            </div>
            <div class="grid">
                <AnimationRevealOnScroll :animation-class="'animate__fadeInDown'">
                    <h1 class="w-full text-base sm:text-xl md:text-2xl lg:text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary font-black">
                        我的简历
                    </h1>
                </AnimationRevealOnScroll>
                <AnimationRevealOnScroll :animation-class="'animate__fadeInDown'" :base-class="'flex items-center text-sm lg:text-base font-normal text-secondary mt-4'">
                    <span>努力做一个摆脱CV的前端工程师</span>
                </AnimationRevealOnScroll>
                <div class="w-full flex mt-4 items-center gap-2">
                    <AnimationRevealOnScroll v-for="item in recordButtonList" :key="item.id" :animation-class="'animate__fadeInDown'" :base-class="'w-fit'">
                        <a :href="item.href" target="_blank" class="button">
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
        </div>
    </div>
</template>

<style lang='postcss' scoped>
:deep(.el-button) {
    @apply text-gray-400 hover:text-black hover:bg-gray-400/20 dark:hover:text-white
}
</style>