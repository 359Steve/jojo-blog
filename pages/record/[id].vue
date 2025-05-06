<script lang='ts' setup>
const route = useRoute()
const id = computed((): string => {
    return route.params.id as string
})
onMounted(() => {
    useVueStarport().setIsRound(true)
})

onBeforeUnmount(() => {
    useVueStarport().setIsRound(false)
})
</script>

<template>
    <div class="w-full grid mobile-pad:grid-cols-3 gap-4">
        <div class="w-full flex justify-center items-center">
            <Starport port="my-id" class="w-24 h-24">
                <RecordImage class="rounded-[50%] transition-all duration-1000" />
            </Starport>
        </div>
        <div class="mobile-pad:col-span-2">2</div>
    </div>
</template>

<style lang='scss' scoped></style>