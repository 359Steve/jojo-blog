<script lang='ts' setup>
import { CloseBold } from '@element-plus/icons-vue'

const { drawer } = storeToRefs(useJojoHeader())
</script>

<template>
    <Teleport to="body">
        <div class="jojo-drawer relative">
            <el-drawer v-model="drawer" size="70%" direction="ltr">
                <div class="absolute w-8 h-8 top-0 right-0 text-[#8a8a8a] flex justify-center items-center hover:cursor-pointer hover:text-black" @click="drawer = false">
                    <el-icon size="20"><CloseBold /></el-icon>
                </div>
                <div>
                    <ul>
                        <li class="p-4 w-full h-16">
                            <div class="w-full h-full flex justify-center items-center">
                                <LogoBasicLogo></LogoBasicLogo>
                                <span class="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">·Josef Joestar</span>
                            </div>
                        </li>
                        <li class="p-2 text-center"><p>人类会舍弃某些事物·继续前进，还是说，要拾起过往·走回弯路呢？</p><p>Gyro Zeppeli</p></li>
                    </ul>
                </div>
                <div></div>
                <div class="py-4">
                    <HeaderMenuList></HeaderMenuList>
                </div>
                <div class="absolute w-full h-10 py-2 bottom-0 left-0 flex justify-center items-center">
                    <img class="h-full" src="~/assets/image/bilibili.png" alt="">
                </div>
            </el-drawer>
        </div>
    </Teleport>
</template>

<style lang='scss' scoped>
.jojo-drawer {
    :deep(header) {
        display: none;
    }
}
</style>