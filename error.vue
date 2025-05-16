<script lang='ts' setup>
const name = ref<string>('')
const email = ref<string>('')
const content = ref<string>('')

const disabled = computed(() => {
    return !name.value || !email.value || !content.value
})
</script>

<template>
    <NuxtLayout name="jojomain">
        <template #page>
            <NuxtLayout name="mainbox">
                <template #childPage>
                    <ErrorMain>
                        <template #error>
                            <main class="w-full mx-auto">
                                <span class="text-4xl">✉️</span>
                                <h1 class="text-base md:text-xl lg:text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary font-black mb-2">Contact Me</h1>
                                <p class="text-sm lg:text-base font-normal text-secondary mb-10 text-gray-500/50">Reach out to me over email or fill up this contact form. I will get back to you ASAP - I promise.</p>
                                <form class="form">
                                    <div class="flex flex-col md:flex-row justify-between gap-5">
                                        <input 
                                            placeholder="你的名字"
                                            class="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                                            type="text" 
                                            v-model="name"
                                        />
                                        <input 
                                            placeholder="你的邮箱"
                                            class="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 py-2 rounded-md text-sm text-neutral-700 w-full"
                                            type="email" 
                                            v-model="email"
                                        />
                                    </div>
                                    <div>
                                        <textarea 
                                            v-model="content"
                                            placeholder="你的问题" 
                                            rows="10"
                                            class="bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 px-2 mt-4 py-2 rounded-md text-sm text-neutral-700 w-full">
                                        </textarea>
                                    </div>
                                    <ElButton :disabled="disabled" type="primary"><span class="font-bold text-sm text-neutral-500">提交</span></ElButton>
                                </form>
                            </main>
                        </template>
                    </ErrorMain>
                </template>
            </NuxtLayout>
        </template>
    </NuxtLayout>
</template>

<style lang='postcss' scoped>
:deep(.el-button) {
    @apply w-full h-11 border-none px-2 py-2 mt-4 bg-neutral-100
}

:deep(.el-button.is-disabled:hover) {
    @apply bg-neutral-100
}
</style>