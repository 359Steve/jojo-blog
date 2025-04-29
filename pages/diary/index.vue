<script lang='ts' setup>
const id = ref<string>('preview-only')
const scrollElement = ref<HTMLElement | null>(null)
const mdText = ref<string>('')

const res = await useGet<any, { content: string }>('/md')
if (res.code === 200) {
    mdText.value = res.data.content
}

if (import.meta.client) {
    scrollElement.value = document.documentElement
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
</script>

<template>
    <div class="w-full h-[calc(100dvh-5rem)]">
        <ClientOnly>
            <MdEditor 
                :id="id" 
                v-model="mdText" 
                :theme="useJojoColorMode().getDarkMode().preference"
                preview-theme="github"
                @save="writeFile"
            />
        </ClientOnly>
    </div>
    <!-- <div class="w-full block sm:grid sm:gap-4 sm:grid-cols-3">
        <div class="w-full p-4">
            <div class="relative sm:sticky sm:top-12">
                <NuxtLayout name="jojoclient">
                    <template #client>
                        <MdCatalog :editorId="id" :scrollElement="scrollElement!" />
                    </template>
                </NuxtLayout>
            </div>
        </div>

        <div class="w-full sm:col-span-2 p-4">
            <NuxtLayout name="jojoclient">
                <template #client>
                    <ClientOnly>
                        <MdPreview :id="id" :modelValue="mdText" :theme="useJojoColorMode().getDarkMode().preference" />
                    </ClientOnly>
                </template>
            </NuxtLayout>
        </div>
    </div> -->
</template>

<style lang='postcss' scoped>
:deep(.md-editor) {
    @apply w-full h-full
}
</style>