<script lang='ts' setup>
type Menu = {
    id: number
    title: string
}
const menuList = reactive<Menu[]>([
    { id: 1, title: '首页' },
    { id: 2, title: '博客' },
    { id: 3, title: '日记' }
])

const drawer = ref<boolean>(false) // 菜单弹窗显示
const headerEl = ref<HTMLElement | null>(null)

onMounted(() =>{
    nextTick(() => {
        const height: number = headerEl.value!.getBoundingClientRect().height
        useJojoHeader().setHeaderHeight(height)
    })
})
</script>

<template>
    <Teleport to="body">
        <el-drawer v-model="drawer" title="I am the title" size="70%" direction="ltr">
            <span>Hi there!</span>
        </el-drawer>
    </Teleport>
    <header ref="headerEl" :class="[
        'w-full h-12 sticky top-0 backdrop-blur transition-all duration-300 ease-in-out border-x-0 flex items-center justify-between z-10 bg-background/50 border-border/50 px-4',
        useJojoHeader().getScroll() ? '-translate-y-full' : 'translate-y-0'
    ]">
        <div class="w-16 h-full py-2"><img src="~/assets/image/logo.png" alt="" class="h-full"></div>
        <div class="hidden w-[calc(100%-8rem)] h-full sm:flex justify-center items-center py-2">
            <div class="w-full h-full">
                <ul class="w-full h-full flex justify-center items-center gap-x-8">
                    <li v-for="item in menuList" :key="item.id" class="h-full leading-[2rem] hover:cursor-pointer">{{ item.title }}</li>
                </ul>
            </div>
        </div>
        <div class="hidden w-16 h-full sm:flex flex-1 justify-end items-center">
            <div class="hover:cursor-pointer"><img src="~/assets/image/facebook.png" alt=""></div>
            <div class="hover:cursor-pointer"><img src="~/assets/image/github.png" alt=""></div>
        </div>
        
        <div class="w-8 h-8 p-1 bg-[white] shadow-md hover:cursor-pointer rounded-md sm:hidden" @click="drawer = true">
            <img src="~/assets/image/menu.png" alt="">
        </div>
    </header>
</template>

<style lang='scss' scoped></style>