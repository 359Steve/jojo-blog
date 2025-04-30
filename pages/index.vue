<script lang='ts' setup>
const mdText = ref<string>('')

const res = await useGet<any, { content: string }>('/md')
if (res.code === 200) {
    mdText.value = res.data.content
}
// 将新的文件内容写入文件
const writeFile = async (value: string) => {
    const res = await fetchPostApi<{ content: string, name: string }, { name: string, content: string }>('/savefile/savefile', {
        body: {
            content: value,
            name: 'md'
        }
    })
    if (res.code === 200) {
        ElMessage({
            message: '保存成功',
            type: 'success'
        })
    }
}

const customHeadingId = (_text: string, level: number, index: number) => {
    return `jojoheader-${level}-${index}`
}
</script>

<template>
    <div class="w-full h-[calc(100dvh-5rem)]">
        <ClientOnly>
            <MdEditor
                v-model="mdText" 
                :theme="useJojoColorMode().getDarkMode().preference"
                preview-theme="github"
                @save="writeFile"
                :show-code-row-number="false"
                :md-heading-id="customHeadingId"
                :auto-detect-code="true"
            />
        </ClientOnly>
    </div>
</template>

<style lang='postcss' scoped>
:deep(.md-editor) {
    @apply w-full h-full
}
</style>