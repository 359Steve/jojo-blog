<script lang='ts' setup>
const route = useRoute()
const id = computed(() => route.query.id)

if (!id.value) {
    throw createError({ statusCode: 500, statusMessage: '出错了！' })
}
</script>

<template>
    <div>blog-detail</div>
</template>

<style lang='scss' scoped>

</style>