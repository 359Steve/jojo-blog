<script lang='ts' setup>
const myText = ref<string>('')

const res = await useGet<any, { content: string }>('/my/my')

if (res.code === 200) {
    myText.value = res.data.content
}
</script>

<template>
    <div class="w-full">
        <!-- 介绍 -->
        <div class="w-full sm:w-[75%] m-auto">
            <div class="w-full h-full pt-8 pb-8">
                <h1 class="font-extralight text-[2.25em] text-center">Josef Joestar</h1>
                <div class="mt-4 text-center">{{ myText }}</div>
            </div>
        </div>
        <div class="w-full flex flex-wrap gap-4">
            <div class="w-full sm:w-[48%] h-20 rounded-base shadow-md backdrop-blur-xs">1</div>
            <div class="w-full sm:w-[48%] h-24 rounded-base shadow-md">2</div>
        </div>
    </div>
</template>

<style lang='postcss' scoped>

</style>