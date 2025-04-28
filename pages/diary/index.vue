<script lang='ts' setup>
const mdText = ref<string>('')
const res = await useGet<any, { content: string }> ('/md')
if (res.code === 200) {
    mdText.value = res.data.content
}
</script>

<template>
    <div class="w-full">
        <ClientOnly>
            <MdEditor v-model="mdText" theme="light" />
        </ClientOnly>
    </div>
</template>

<style lang='scss' scoped>

</style>