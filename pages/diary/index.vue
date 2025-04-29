<script lang='ts' setup>
const mdText = ref<string>('')
const res = await useGet<any, { content: string }> ('/md')
if (res.code === 200) {
    mdText.value = res.data.content
}
</script>

<template>
    <div class="w-full h-[calc(100dvh-3rem)]">
        <ClientOnly>
            <MdEditor v-model="mdText" :theme="useJojoColorMode().getDarkMode().preference" />
            <!-- <MdPreview v-model="mdText"></MdPreview> -->
        </ClientOnly>
    </div>
</template>

<style lang='postcss' scoped>
:deep(.md-editor) {
    @apply w-full h-full
}
</style>