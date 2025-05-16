<script lang='ts' setup>

</script>

<template>
    <div class="w-full">
        <section class="font-serif w-full h-[calc(100dvh-(5rem+110px))] sm:h-[calc(100dvh-(5rem+80px))] flex items-center justify-center">
            <div class="container mx-auto">
                <div class="flex justify-center">
                    <slot name="error"></slot>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang='scss' scoped>

</style>