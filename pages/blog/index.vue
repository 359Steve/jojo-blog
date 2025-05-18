<script lang='ts' setup>
import type { AnimationRevealOnScroll, ElInput } from '~/.nuxt/components'
import type { BlogList } from '~/types/com-types'

const blogList = reactive<BlogList[]>([
    {
        id: 1,
        title: "Aceternity",
        description: "A design and development studio that focuses on building quality apps.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project1')
    },
    {
        id: 2,
        title: "Algochurn",
        description: "Practice for technical interviews with hands on coding challenges.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project2')
    },
    {
        id: 3,
        title: "Moonbeam",
        description: "Never write from scratch again with Moonbeam, your AI first writing tool.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project3')
    },
    {
        id: 4,
        title: "Tailwind Master Kit",
        description: "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project4')
    },
    {
        id: 5,
        title: "Aceternity",
        description: "A design and development studio that focuses on building quality apps.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project1')
    },
    {
        id: 6,
        title: "Algochurn",
        description: "Practice for technical interviews with hands on coding challenges.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project2')
    },
    {
        id: 7,
        title: "Moonbeam",
        description: "Never write from scratch again with Moonbeam, your AI first writing tool.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project3')
    },
    {
        id: 8,
        title: "Tailwind Master Kit",
        description: "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project4')
    },
    {
        id: 9,
        title: "Tailwind Master Kit",
        description: "A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.",
        tags: [
            { name: "Nextjs", icon: "ri-tailwind-css-fill" },
            { name: "Tailwindcss", icon: "ri-vuejs-fill" }
        ],
        url: await useLoadStaticImage('project4')
    }
])

const search = ref<string>('')
const inputShow = ref<boolean>(false)
const inputEl = ref<InstanceType<typeof ElInput> | null>(null)
const animationEl = ref<InstanceType<typeof AnimationRevealOnScroll> | null>(null)
const coincidence = ref<boolean>(true)

let parentBounds: ReturnType<typeof useElementBounding>
let childBounds: ReturnType<typeof useElementBounding>

const controlInput = (): void => {
    inputShow.value = !inputShow.value
}

const toDetail = (item: BlogList): void => {
    navigateTo({ path: '/blog/detail', query: { id: item.id } })
}

const isLeftAligned = computed(() => {
    if (!parentBounds || !childBounds) return false
    return Math.abs(childBounds.left.value - parentBounds.left.value) < 1
})

const onTransitionEnd = () => {
    coincidence.value = isLeftAligned.value
}

onMounted(() => {
    nextTick(() => {
        const input_el: HTMLElement = inputEl.value!.$el
        parentBounds = useElementBounding(animationEl.value!.el)
        childBounds = useElementBounding(inputEl.value!.$el)
        input_el.addEventListener('transitionend', onTransitionEnd)
    })
})

onBeforeUnmount(() => {
    const input_el: HTMLElement = inputEl.value!.$el
    input_el.removeEventListener('transitionend', onTransitionEnd)
})

watch(coincidence, () => {
    if (!coincidence.value) {
        inputEl.value?.focus()
    }
})
</script>

<template>
    <AnimationRevealOnScroll ref="animationEl" :animation-class="'animate__fadeInDown'" :base-class="'reactive mb-10 flex items-center justify-between overflow-hidden'">
        <h1
            class="
            text-xl 
            md:text-2xl
            lg:text-4xl 
            bg-clip-text 
            bg-gradient-to-r
            font-black
            "
        >
            What I've been working on
        </h1>
        <ElInput
            ref="inputEl"
            v-model="search"
            placeholder="Search"
            size="large"
            :class="inputShow ? 'translate-x-0' : 'translate-x-full'"
            @blur="inputShow = false"
        >
        </ElInput>
        <div @click="controlInput" :class="['absolute flex justify-center items-center cursor-pointer right-0 h-full aspect-square border-none shadow-none rounded-base hover:bg-neutral-100', !coincidence ? 'hidden' : 'block']">
            <i class="
                ri-search-eye-line 
                text-black
                dark:text-white
                text-xl 
                md:text-2xl
                bg-clip-text 
                bg-gradient-to-r 
                font-black"
            ></i>
        </div>
    </AnimationRevealOnScroll>
    <div class="w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimationRevealOnScroll 
                v-for="item in blogList" 
                :key="item.id"
                @click="toDetail(item)"
                :animation-class="'animate__fadeInDown'"
                :base-class="`
                    cursor-pointer
                    group 
                    flex 
                    flex-col 
                    sm:flex-row 
                    space-y-4 
                    sm:space-y-0 
                    sm:space-x-4 
                    hover:bg-gray-50 
                    dark:hover:bg-gray-100/10
                    rounded-base 
                    transition 
                    duration-200 
                    p-2
                    shadow-lg 
                    dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)]`"
            >
                <img
                    alt="thumbnail"
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    class="rounded-base w-full sm:w-[200px] object-cover"
                    :src="item.url"
                />
                <div class="flex flex-col justify-between">
                    <div>
                        <h4
                            class="
                            bg-clip-text  
                            bg-gradient-to-r 
                            from-primary 
                            to-secondary 
                            font-black 
                            text-lg 
                            md:text-lg 
                            lg:text-lg
                            "
                        >
                            {{ item.title }}
                        </h4>
                        <p
                            class="
                            font-normal 
                            text-secondary 
                            text-sm 
                            md:text-sm 
                            lg:text-sm 
                            mt-2 
                            max-w-xl
                            "
                        >
                            {{ item.description }}
                        </p>
                    </div>
                    <div class="flex space-x-2 md:mb-1 mt-2 md:mt-0">
                        <span
                            v-for="tag in item.tags"
                            :key="tag.name"
                            class="
                            text-xs 
                            md:text-xs 
                            lg:text-xs 
                            bg-gray-100
                            dark:bg-gray-100/10
                            px-2 
                            py-1 
                            rounded-base 
                            text-secondary
                            "
                        >
                            <i :class="['mr-2', tag.icon]"></i>{{ tag.name }}
                        </span>
                    </div>
                </div>
            </AnimationRevealOnScroll>
        </div>
    </div>
</template>

<style lang='postcss' scoped>
:deep(.el-input) {
    @apply absolute transition-all delay-300 w-full h-full top-0 left-0;
}

/* :deep(.el-input-group__append) {
    @apply h-full aspect-square p-0 border-none shadow-none bg-neutral-100 rounded-tr-base rounded-br-base rounded-tl-none rounded-bl-none;
} */

:deep(.el-input__wrapper) {
    @apply border-none shadow-none ring-0 focus:ring-0 focus:outline-none bg-neutral-100 px-2 py-2 rounded-tl-base rounded-bl-base rounded-tr-none rounded-br-none;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus),
:deep(.el-input__wrapper:focus),
:deep(.el-input__wrapper.is-hover) {
    @apply border-none shadow-none ring-0 outline-none;
}

:deep(.el-input__inner) {
    @apply border-none shadow-none ring-0 focus:ring-0 focus:outline-none bg-transparent text-sm text-neutral-700;
}
</style>