<script lang='ts' setup>
const route = useRoute()
const id = computed(() => route.query.id)
</script>

<template>
    <div class="relative flex justify-center items-center cursor-pointer rounded-base overflow-hidden h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[16rem] 2xl:h-[16rem]">
        <Starport :port="id" class="w-full h-full">
            <RecordDetailImage />
        </Starport>
        <div class="absolute z-9 w-full h-full backdrop-blur-sm bg-white/40 dark:bg-black/40 flex gap-8 p-8">
            <span class="text-[1em] font-bold text-center"></span>
        </div>
    </div>
     <div class="w-full py-4 sm:py-8">
        <div class="mb-4 sm:mb-6 text-center font-extrabold text-lg">从Webpack转向Vite，提升开发效率</div>
        <div class="text-center">
            A software engineer walks into a job interview.

            The interviewer says, “We’re looking for someone who can handle pressure. Can you give me an example of a time you worked under pressure?”

            The engineer thinks for a second and says,
            “Well… once I deployed to production on a Friday… with no backup… during a team meeting… while the CTO was watching… and the internet went down.”

            The interviewer, wide-eyed, asks, “What happened next?”

            The engineer shrugs, “I updated my LinkedIn.”
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>