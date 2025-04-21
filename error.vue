<script lang='ts' setup>
interface Error {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
}

const { error } = defineProps<{
    error: Error
}>()

clearError({
    redirect: '/blog'
})
</script>

<template>
    <div>
        <span>{{ error.message }}</span>
    </div>
</template>

<style lang='scss' scoped>

</style>