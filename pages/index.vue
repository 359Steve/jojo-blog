<script lang='ts' setup>
const input = ref<number>(1)
const check = reactive([
    { title: 'Google Pay', value: 1, checked: false },
    { title: 'Apple Pay', value: 2, checked: false },
    { title: 'PayPal', value: 3, checked: false },
])
</script>

<template>
    <div class="mt-4 space-y-2 h-[150vh]">
        <label v-for="item in check" :key="item.title" @click="input = item.value" class="w-full flex justify-between
                items-center
                rounded-lg p-4
                hover:cursor-pointer
                hover:bg-gray-100 
                has-[input:checked]:bg-indigo-50 
                has-[input:checked]:text-indigo-800 
                has-[input:checked]:ring-indigo-200 
                has-[input:checked]:ring-1
                dark:hover:bg-white/5 
                dark:has-[input:checked]:bg-indigo-950 
                dark:has-[input:checked]:text-indigo-200 
                dark:has-[input:checked]:ring-indigo-900">
            <div class="flex items-center"><span class="w-[5rem] text-center">{{ item.title }}</span>
                <div class="radioInput"></div>
            </div>
            <input id="apple" type="radio" class="box-content 
                        h-1.5 w-1.5 
                        appearance-none 
                        rounded-full 
                        border-[5px] 
                        border-white 
                        bg-white bg-clip-padding 
                        ring-1 ring-gray-950/20 
                        outline-none 
                        checked:border-indigo-500 
                        checked:ring-indigo-500" name="payment_method" v-model="input" :value="item.value">
        </label>
        <form>
            <div>
                <label for="email-2" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span style="vertical-align: inherit;">
                        <span style="vertical-align: inherit;">电子邮件</span>
                    </span>
                </label>
                <div class="mt-1"><input type="email" id="email-2" class="peer block w-full 
                        rounded-md border 
                        border-gray-300 px-3 py-2 
                        placeholder-gray-400 shadow-sm 
                        invalid:border-pink-500 
                        invalid:text-pink-600 
                        focus:border-sky-500 
                        focus:outline 
                        focus:outline-sky-500 
                        focus:invalid:border-pink-500 
                        focus:invalid:outline-pink-500 
                        disabled:border-gray-200 
                        disabled:bg-gray-50 
                        disabled:text-gray-500 
                        disabled:shadow-none sm:text-sm" placeholder="you@example.com" name="email"
                        value="george@krugerindustrial.">
                    <p class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
                        <span style="vertical-align: inherit;">
                            <span style="vertical-align: inherit;">请提供有效的电子邮件地址。</span>
                        </span>
                    </p>
                </div>
            </div>
        </form>

        <div class="text-center text-2xl font-semibold text-gray-900 italic dark:text-white">
            When you look
            <span
                class="relative inline-block before:absolute before:-inset-0 before:block before:-skew-y-3 before:bg-pink-500">
                <span class="relative text-white dark:text-gray-950">annoyed</span>
            </span>
            all the time, people think that you're busy.
        </div>

        <input type="file"
            class="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500" />

        <div class="grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-7 [&_div]:bg-[#DBDBDB]">
            <div class="rounded-md h-8 bg-[pink]">1</div>
            <div class="rounded-md h-8 bg-[pink]">2</div>
            <div class="rounded-md h-8 bg-[pink]">3</div>
            <div class="rounded-md h-8 bg-[pink]">4</div>
            <div class="rounded-md h-8 bg-[pink]">5</div>
            <div class="rounded-md h-8 bg-[pink]">6</div>
            <div class="rounded-md h-8 bg-[pink]">7</div>
        </div>

        <div class="columns-4xs p-4">
            <div class="break-inside-avoid bg-pink-300 rounded-lg p-4">内容1</div>
            <div class="break-inside-avoid bg-pink-400 rounded-lg p-4">内容2</div>
            <div class="break-inside-avoid bg-pink-500 rounded-lg p-4">内容3</div>
            <div class="break-inside-avoid bg-pink-600 rounded-lg p-4">内容4</div>
            <div class="break-inside-avoid bg-pink-700 rounded-lg p-4">内容5</div>
            <div class="break-inside-avoid bg-pink-800 rounded-lg p-4">内容6</div>
        </div>


        <div class="columns-2 sm:columns-4 p-4">
            <div class="bg-pink-300 p-4">内容1</div>
            <div class="bg-pink-400 p-4 break-before-column">内容2 123123123213123213</div>
            <div class="bg-pink-500 p-4">内容3</div>
            <div class="bg-pink-600 p-4">内容4</div>
        </div>

        <span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
            Hello<br />World
        </span>
        <span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white">
            Hello<br />World
        </span>

        <div class="flex">
            <div class="shrink-0 w-64 bg-pink-300">不能缩小</div>
            <div class="flex-1 bg-pink-500">可以自动缩小</div>
        </div>

        <div class="grid grid-flow-col grid-cols-2 auto-cols-min gap-4">
            <div class="bg-pink-300 p-4">内容1</div>
            <div class="bg-pink-400 p-4">内容2内容内容</div>
            <div class="bg-pink-500 p-4">内容3</div>
        </div>

        <div class="grid grid-cols-3 gap-4">
            <div class="bg-pink-300 p-4 font-ww"><span>左对齐</span></div>
            <div class="bg-pink-400 p-4">居中</div>
            <div class="bg-pink-500 p-4">右对齐</div>
        </div>

        <div class="bg-white dark:bg-black text-gray-500/70 p-4">
            白色背景下的淡灰色文字
        </div>

    </div>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper) {
    @apply shadow-none border border-indigo-500 dark:border-indigo-800;
}
</style>