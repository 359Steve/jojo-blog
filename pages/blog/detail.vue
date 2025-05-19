<script lang='ts' setup>
const route = useRoute()
const id = computed(() => route.query.id)

if (!id.value) {
    throw createError({ statusCode: 500, statusMessage: '出错了！' })
}
</script>

<template>
    <RecordBackground>
        <div class="w-full h-[400px]">123123</div>
    </RecordBackground>
</template>

<style lang='scss' scoped>

</style>