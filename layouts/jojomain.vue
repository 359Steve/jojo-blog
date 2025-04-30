<script lang='ts' setup>
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference === 'dark' ? false : true)

const changeTheme = (e: MouseEvent): void => {
    const transition: ViewTransition = document.startViewTransition(() => {
        selectTheme.value = !selectTheme.value
    })
}

watch(selectTheme, () => {
    useJojoColorMode().setDarkMode(selectTheme.value ? 'light' : 'dark')
})
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

<style lang='scss' scoped></style>