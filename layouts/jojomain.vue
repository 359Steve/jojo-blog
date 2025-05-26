<script lang='ts' setup>
import { detectDeviceDetail } from '~/composables/public'

const isMobile = ref<'mobile' | 'tablet' | 'desktop'>()
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference === 'dark' ? false : true)

const changeTheme = async (_e: MouseEvent): Promise<void> => {
    selectTheme.value = !selectTheme.value
    const transition: ViewTransition = document.startViewTransition(() => {
        useJojoColorMode().setDarkMode(selectTheme.value ? 'light' : 'dark')
    })

    transition.ready.then(() => {
        const isDark = useJojoColorMode().getDarkMode().preference === 'dark'
        const clientX = innerWidth / 2
        const clientY = innerHeight / 2

        // 计算最大半径
        const radius = Math.hypot(
            Math.max(clientX, innerWidth - clientX),
            Math.max(clientY, innerHeight - clientY)
        )

        // 开始动画
        const clipPath = [
            `circle(0% at ${clientX}px ${clientY}px)`,
            `circle(${radius}px at ${clientX}px ${clientY}px)`
        ]
        document.documentElement.animate(
            {
                clipPath: isDark ? clipPath.reverse() : clipPath
            },
            // 设置时间，已经目标伪元素
            {
                duration: 500,
                pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
            }
        )
    })
}

onMounted(() => {
    const { type } = detectDeviceDetail()
    isMobile.value = type
})
</script>

<template>
    <div class="relative w-full h-full">
        <RecordBackground v-if="isMobile === 'desktop' || 'tablet'" :class-name="'w-full h-[100dvh] fixed inset-0 z-[-1]'"></RecordBackground>
        <BgcanvasBranchCanvas v-else></BgcanvasBranchCanvas>
        <el-backtop :right="50" :bottom="100">
            <i class="ri-arrow-up-line"></i>
        </el-backtop>
        <div class="w-full h-full">
            <!-- 导航栏 -->
            <HeaderBox :select-theme="selectTheme" @change-theme="changeTheme"></HeaderBox>
            <slot name="page"></slot>
            <FooterBox></FooterBox>
        </div>
    </div>
</template>

<style lang='postcss' scoped>
:deep(.el-backtop) {
    @apply hidden sm:flex justify-center items-center text-black dark:text-white
}
</style>