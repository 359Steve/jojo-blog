<script lang='ts' setup>
const { drawer } = defineProps<{
    drawer: boolean
}>()

const emit = defineEmits<{
    (e: 'close'): void
}>()

const onShow = ref<boolean>(drawer)

watchEffect(() => {
    onShow.value = drawer
})
</script>

<template>
    <Teleport to="body">
        <el-drawer v-model="onShow" size="70%" direction="ltr" @close="emit('close')">
            div
        </el-drawer>
    </Teleport>
</template>

<style lang='scss' scoped></style>