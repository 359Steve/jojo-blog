<script lang='ts' setup>
const { drawer } = storeToRefs(useJojoHeader())
</script>

<template>
    <Teleport to="body">
        <el-drawer v-model="drawer" size="70%" direction="ltr">
            <HeaderMenuList></HeaderMenuList>
        </el-drawer>
    </Teleport>
</template>

<style lang='scss' scoped></style>