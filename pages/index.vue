<script lang='ts' setup>
const input = ref<string>('')
const check = reactive([
    { title: 'Google Pay', value: false },
    { title: 'Apple Pay', value: false },
    { title: 'PayPal', value: false },
])
</script>

<template>
    <div class="mt-4 space-y-2">
        <label 
            v-for="item in check" 
            :key="item.title" 
            class="w-full flex justify-between
                items-center
                rounded-lg p-4
                hover:bg-gray-100 
                has-[input:checked]:bg-indigo-50 
                has-[input:checked]:text-indigo-800 
                has-[input:checked]:ring-indigo-200 
                has-[input:checked]:ring-1
                dark:hover:bg-white/5 
                dark:has-[input:checked]:bg-indigo-950 
                dark:has-[input:checked]:text-indigo-200 
                dark:has-[input:checked]:ring-indigo-900"
        >
            <div class="flex items-center"><span class="w-[5rem] text-center">{{ item.title }}</span> <div class="radioInput"><ElInput v-model="input"></ElInput></div></div>
            <input id="apple" 
                    type="radio"
                    class="box-content 
                        h-1.5 w-1.5 
                        appearance-none 
                        rounded-full 
                        border-[5px] 
                        border-white 
                        bg-white bg-clip-padding 
                        ring-1 ring-gray-950/20 
                        outline-none 
                        checked:border-indigo-500 
                        checked:ring-indigo-500"
                    name="payment_method" 
                    :checked="item.value" 
                    value="google"
            >
        </label>
    </div>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper) {
    @apply shadow-none border border-indigo-500 dark:border-indigo-800;
}
</style>