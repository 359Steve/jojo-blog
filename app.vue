<script lang='ts' setup>
const scrollY = ref<number>(0)

const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    scrollTop > scrollY.value && scrollTop > useJojoHeader().getHeaderHeight() ? 
    useJojoHeader().setScroll(true) : useJojoHeader().setScroll(false)
    scrollY.value = scrollTop
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <NuxtLayout name="jojomain">
        <template #page>
            <NuxtLayout name="mainbox">
                <template #childPage>
                    <NuxtPage />
                </template>
            </NuxtLayout>
        </template>
    </NuxtLayout>
</template>

<style lang='scss' scoped></style>