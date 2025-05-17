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
                                <h1 class="text-base md:text-xl lg:text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary font-black mb-2">提交问题</h1>
                                <p class="text-sm lg:text-base font-normal text-secondary mb-10 text-gray-500/50">请通过电子邮件或填写此问题表格。我会在最短的时间内解决问题。</p>
                                <form class="form">
                                    <div class="flex flex-col md:flex-row justify-between gap-5">
                                        <input 
                                            placeholder="你的名字"
                                            class="
                                                bg-neutral-100 
                                                dark:bg-gray-100/10
                                                focus:outline-none 
                                                border
                                                dark:border-gray-100/20
                                                focus:border-emerald-500
                                                dark:focus:border-emerald-500
                                                px-2 py-2 
                                                rounded-md 
                                                text-sm 
                                                text-neutral-700
                                                dark:text-[white]
                                                w-full"
                                            type="text" 
                                            v-model="name"
                                        />
                                        <input 
                                            placeholder="你的邮箱"
                                            class="
                                                w-full block text-sm
                                                px-2 py-2 rounded-md
                                                bg-neutral-100 text-neutral-700
                                                dark:border-gray-100/20
                                                dark:bg-gray-100/10
                                                dark:focus:border-emerald-500
                                                dark:text-[white]
                                                border
                                                focus:outline-none
                                                focus:ring-emerald-500
                                                focus:border-emerald-500
                                                invalid:border-red-500
                                                invalid:text-red-600
                                                focus:invalid:border-red-500
                                                focus:invalid:ring-red-500
                                                dark:invalid:border-red-500
                                                dark:invalid:text-red-600
                                                dark:focus:invalid:border-red-500
                                                dark:focus:invalid:ring-red-500
                                            "
                                            type="email" 
                                            v-model="email"
                                        />
                                    </div>
                                    <div>
                                        <textarea 
                                            v-model="content"
                                            placeholder="你的问题"
                                            class="
                                                h-[9em] sm:h-[15em] 
                                                bg-neutral-100 
                                                focus:outline-none border 
                                                focus:border-emerald-500 
                                                px-2 mt-4 py-2 rounded-md 
                                                text-sm text-neutral-700 
                                                w-full
                                                dark:border-gray-100/20
                                                dark:bg-gray-100/10
                                                dark:focus:border-emerald-500
                                                dark:text-[white]
                                            "
                                            >
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
    @apply w-full h-11 border-none px-2 py-2 mt-4 bg-neutral-100 dark:bg-gray-100/10
}

:deep(.el-button.is-disabled:hover) {
    @apply bg-neutral-100
}
</style>