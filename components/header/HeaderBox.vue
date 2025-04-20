<script lang='ts' setup>
import darkImg from '~/assets/image/dark.png'
import lightImg from '~/assets/image/light.png'
import darkLogo from '~/assets/image/dark_logo.png'
import lightLogo from '~/assets/image/light_logo.png'

const { drawer } = storeToRefs(useJojoHeader())
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference === 'dark' ? false : true)
const headerEl = ref<HTMLElement | null>(null)
const { darkMode } = storeToRefs(useJojoColorMode())

onMounted(() =>{
    nextTick(() => {
        const height: number = headerEl.value!.getBoundingClientRect().height
        useJojoHeader().setHeaderHeight(height)
    })
})

watch(selectTheme, () => {
    darkMode.value.preference = selectTheme.value ? 'light' : 'dark'
})
</script>

<template>
    <HeaderDrawerHeader></HeaderDrawerHeader>
    <header ref="headerEl" :class="[
        'w-full h-12 sticky top-0 backdrop-blur transition-all duration-300 ease-in-out border-x-0 flex items-center justify-between z-10 bg-background/50 border-border/50 px-4',
        useJojoHeader().getScroll() ? '-translate-y-full' : 'translate-y-0']"
    >
        <div class="w-24 h-full py-2"><img :src="darkMode.preference === 'dark' ? lightLogo : darkLogo" alt="" class="h-full"></div>
        <div class="hidden w-[calc(100%-7rem)] h-full sm:flex justify-center items-center">
            <HeaderMenuList></HeaderMenuList>
        </div>
        <div class=" w-fit h-full flex justify-between items-center gap-x-2">
            <div class="hidden sm:flex justify-center items-center hover:cursor-pointer hover:bg-[#DBDBDB] w-8 h-8 bg-[white] shadow-md rounded-md"><img class="w-6 h-6" src="~/assets/image/facebook.png" alt=""></div>
            <div class="hidden sm:flex justify-center items-center hover:cursor-pointer hover:bg-[#DBDBDB] w-8 h-8 bg-[white] shadow-md rounded-md"><img class="w-6 h-6" src="~/assets/image/github.png" alt=""></div>
            <div class="flex items-center justify-between gap-x-2">
                <div class="w-8 h-8 hover:cursor-pointer hover:bg-[#DBDBDB]  flex justify-center items-center bg-[white] shadow-md rounded-md" @click="selectTheme = !selectTheme"><img class="w-6 h-6" :src="selectTheme ? darkImg : lightImg" alt=""></div>
                <div class="w-8 h-8 hover:cursor-pointer hover:bg-[#DBDBDB]  p-1 bg-[white] shadow-md rounded-base sm:hidden" @click="drawer = !drawer">
                    <img class="h-full leading-6" src="~/assets/image/menu.png" alt="">
                </div>
            </div>
        </div>
    </header>
</template>

<style lang='scss' scoped></style>