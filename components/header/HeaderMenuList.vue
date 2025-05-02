<script lang='ts' setup>
const { menuList, drawer, menuId } = storeToRefs(useJojoHeader())

const toPath = (item: typeof menuList.value[number]) => {
    menuId.value = item.id
    drawer.value = false
    navigateTo(item.path)
}
</script>

<template>
    <div class="w-full">
        <ul class="w-full mobile-pad:flex justify-center items-center mobile-pad:gap-x-12">
            <li v-for="item in menuList" 
                :key="item.id" 
                :class="[
                    `mobile-pad:h-full 
                    leading-[3rem] 
                    mb-4 mobile-pad:mb-0 
                    px-4 mobile-pad:px-0 
                    shadow-sm mobile-pad:shadow-none  
                    rounded-base mobile-pad:rounded-none 
                    hover:cursor-pointer`,
                    menuId === item.id ? 'shadow-none bg-black mobile-pad:bg-inherit dark:bg-[white] mobile-pad:dark:bg-inherit' : 'hover:bg-[#DBDBDB] mobile-pad:hover:bg-transparent hover:text-black mobile-pad:dark:text-white'
                ]"
                @click="toPath(item)"
            >
                <span :class="[menuId === item.id ? 'font-bold text-white mobile-pad:text-black dark:text-black mobile-pad:dark:text-white' : '']">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>

</style>