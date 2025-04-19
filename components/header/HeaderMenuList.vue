<script lang='ts' setup>
const { menuList, drawer, menuId } = storeToRefs(useJojoHeader())

const toPath = (item: typeof menuList.value[number]) => {
    menuId.value = item.id
    drawer.value = false
    navigateTo(item.path)
}
</script>

<template>
    <div class="w-full h-full">
        <ul class="w-full h-full sm:flex justify-center items-center sm:gap-x-12">
            <li v-for="item in menuList" 
                :key="item.id" 
                :class="[
                    `sm:h-full 
                    leading-[3rem] 
                    mb-4 sm:mb-0 
                    px-4 sm:px-0 
                    shadow-sm sm:shadow-none  
                    rounded-base sm:rounded-none 
                    hover:cursor-pointer`,
                    menuId === item.id ? 'shadow-none bg-black sm:bg-inherit' : 'hover:bg-[#DBDBDB] sm:hover:bg-transparent'
                ]"
                @click="toPath(item)"
            >
                <span :class="[menuId === item.id ? 'font-bold text-white sm:text-black ' : '']">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>

</style>