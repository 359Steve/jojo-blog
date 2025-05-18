<script lang='ts' setup>
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
    }
])
</script>

<template>
    <main class="w-full mx-auto mt-4 sm:mt-8">
        <h1
            class="
            text-xl 
            md:text-2xl
            lg:text-4xl 
            bg-clip-text 
            bg-gradient-to-r 
            from-primary 
            to-secondary 
            font-black 
            mb-10
            "
        >
            What I've been working on
        </h1>
        <div class="w-full">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div v-for="item in blogList" :key="item.id" class="
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
                        rounded-2xl 
                        transition 
                        duration-200 
                        p-2
                ">
                    <img
                        alt="thumbnail"
                        loading="lazy"
                        decoding="async"
                        data-nimg="1"
                        class="rounded-md w-full sm:w-[200px] object-cover"
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
                                rounded-sm 
                                text-secondary
                                "
                            >
                                <i :class="['mr-2', tag.icon]"></i>{{ tag.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang='scss' scoped></style>