<script lang='ts' setup>
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference === 'dark' ? false : true)

const changeTheme = (_e: MouseEvent): void => {
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
                clipPath: isDark ? clipPath.reverse() : clipPath,
            },
            // 设置时间，已经目标伪元素
            {
                duration: 500,
                pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
            }
        )
    })
}
</script>

<template>
    <div class="relative w-full h-full">
        <BgcanvasBranchCanvas></BgcanvasBranchCanvas>
        <div class="w-full h-full">
            <!-- 导航栏 -->
            <HeaderBox :select-theme="selectTheme" @change-theme="changeTheme"></HeaderBox>
            <slot name="page"></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>