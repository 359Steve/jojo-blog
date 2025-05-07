<script lang='ts' setup>
import darkImg from '~/assets/image/dark.png'
import lightImg from '~/assets/image/light.png'

const { drawer } = storeToRefs(useJojoHeader())
const headerEl = ref<HTMLElement | null>(null)

const { selectTheme } = defineProps<{
    selectTheme?: boolean
}>()

defineEmits<{
    (e: 'changeTheme', value: MouseEvent): void
}>()

onMounted(() => {
    nextTick(() => {
        const height: number = headerEl.value!.getBoundingClientRect().height
        useJojoHeader().setHeaderHeight(height)
    })
})
</script>

<template>
    <HeaderDrawerHeader></HeaderDrawerHeader>
    <header ref="headerEl" :class="[
        `w-full h-12 
        sticky top-0 
        backdrop-blur 
        transition-all 
        duration-300 ease-in-out 
        border-x-0 
        flex items-center justify-between 
        z-10 bg-background/50 
        border-border/50 px-4`,
        useJojoHeader().getScroll() ? '-translate-y-full' : 'translate-y-0']"
    >
        <div class="w-24 h-full py-2 cursor-pointer">
            <LogoBasicLogo></LogoBasicLogo>
        </div>
        <div class="hidden w-[calc(100%-7rem)] h-full sm:flex justify-center items-center">
            <HeaderMenuList></HeaderMenuList>
        </div>
        <div class=" w-fit h-full flex justify-between items-center gap-x-2">
            <div class="hidden sm:flex 
                justify-center items-center 
                hover:cursor-pointer 
                hover:bg-[#DBDBDB] w-8 h-8 
                bg-[white] shadow-md rounded-md p-2"
            >
                <a href="https://www.facebook.com/profile.php?id=61565513711985" target="_blank">
                    <img class="w-full" src="~/assets/image/facebook.png" alt="facebook">
                </a>
            </div>
            <div class="hidden sm:flex 
                justify-center items-center 
                hover:cursor-pointer 
                hover:bg-[#DBDBDB] 
                w-8 h-8 bg-[white] 
                shadow-md rounded-md p-2"
            >
                <a href="https://github.com/359Steve" target="_blank">
                    <img class="w-full" src="~/assets/image/github.png" alt="github">
                </a>
            </div>
            <div class="flex items-center justify-between gap-x-2">
                <div class="w-8 h-8 
                    hover:cursor-pointer 
                    hover:bg-[#DBDBDB]
                    flex justify-center items-center 
                    bg-[white] shadow-md 
                    rounded-md p-2" 
                    @click="$emit('changeTheme', $event)"
                >
                    <img class="w-full" :src="selectTheme ? darkImg : lightImg" alt="">
                </div>
                <div class="w-8 h-8 
                    hover:cursor-pointer 
                    hover:bg-[#DBDBDB]  
                    bg-[white] shadow-md 
                    rounded-base sm:hidden p-2" 
                    @click="drawer = !drawer"
                >
                    <img class="h-full leading-6" src="~/assets/image/menu.png" alt="">
                </div>
            </div>
        </div>
    </header>
</template>

<style lang='scss' scoped></style>