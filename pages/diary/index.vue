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
</script>

<template>
    <div class="w-full h-[calc(100dvh-5rem)]">
        <ClientOnly>
            <MdEditor :id="id" v-model="mdText" :theme="useJojoColorMode().getDarkMode().preference" />
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