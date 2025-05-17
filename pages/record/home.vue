<script lang='ts' setup>
import type { RecordSummary, Summary } from '~/types/com-types';
import { toWords } from 'number-to-words';

const summaryList = reactive<RecordSummary[]>([
    {
        id: '1',
        year: '2020',
        data: [
            { id: '1-1', icon: 'ri-bilibili-fill', title: 'BiliBili', summary: '第一次接触前端，始于TXT编写HTML', year: '2020' },
            { id: '1-2', icon: 'ri-html5-fill', title: 'HTML基础', summary: '掌握基础标签、结构、语义化等知识', year: '2020' },
            { id: '1-3', icon: 'ri-css3-fill', title: 'CSS入门', summary: '学习盒模型、选择器、定位等基本布局技能', year: '2020' },
            { id: '1-4', icon: 'ri-javascript-fill', title: 'JavaScript初识', summary: '开始了解变量、函数、事件处理等基础语法', year: '2020' }
        ]
    },
    {
        id: '2',
        year: '2021',
        data: [
            { id: '2-1', icon: 'ri-code-box-line', title: '项目实战', summary: '独立完成第一个静态网页项目', year: '2021' },
            { id: '2-2', icon: 'ri-git-merge-line', title: 'Git/GitHub', summary: '学习版本控制工具，掌握基础命令与协作', year: '2021' },
            { id: '2-3', icon: 'ri-terminal-box-line', title: '开发工具', summary: '熟悉 VSCode、Chrome DevTools 等工具使用', year: '2021' },
            { id: '2-4', icon: 'ri-reactjs-line', title: '初识React', summary: '尝试使用React构建简单组件', year: '2021' },
            { id: '2-5', icon: 'ri-layout-masonry-line', title: '响应式布局', summary: '学习媒体查询，适配移动端设备', year: '2021' }
        ]
    },
    {
        id: '3',
        year: '2022',
        data: [
            { id: '3-1', icon: 'ri-vuejs-fill', title: '深入Vue', summary: '系统学习Vue 2与Vue 3，掌握组件通信、生命周期', year: '2022' },
            { id: '3-2', icon: 'ri-vuejs-line', title: 'Vue Router & Vuex', summary: '实现前端路由和状态管理', year: '2022' },
            { id: '3-3', icon: 'ri-server-line', title: 'Node.js入门', summary: '学习使用Express搭建简单后端接口', year: '2022' },
            { id: '3-4', icon: 'ri-database-2-line', title: 'MongoDB初探', summary: '了解NoSQL数据库基本概念', year: '2022' },
            { id: '3-5', icon: 'ri-dashboard-line', title: 'Element UI实践', summary: '用组件库构建后台管理系统', year: '2022' },
            { id: '3-6', icon: 'ri-links-line', title: '接口联调', summary: '掌握axios与后端接口的数据交互', year: '2022' }
        ]
    },
    {
        id: '4',
        year: '2023',
        data: [
            { id: '4-1', icon: 'ri-code-s-slash-line', title: 'TypeScript应用', summary: '在Vue项目中引入并实践TypeScript', year: '2023' },
            { id: '4-2', icon: 'ri-terminal-window-line', title: 'Vite生态', summary: '从Webpack转向Vite，提升开发效率', year: '2023' },
            { id: '4-3', icon: 'ri-brush-line', title: '组件库开发', summary: '尝试封装通用业务组件，提高复用性', year: '2023' },
            { id: '4-4', icon: 'ri-sparkling-2-line', title: '动画与交互', summary: '学习GSAP、ScrollTrigger实现页面动效', year: '2023' },
            { id: '4-5', icon: 'ri-macbook-line', title: 'Electron尝试', summary: '构建桌面应用并与本地文件系统交互', year: '2023' }
        ]
    }
])

const toDetail = (item: Summary): void => {
    navigateTo({ path: '/record/detail', query: { id: item.id } })
}

const foYear = (value: number): string => {
    return toWords(value)
}
</script>

<template>
    <div class="w-full py-4 sm:py-8">
        <!-- <div v-for="item in summaryList" :key="item.id" class="relative w-full mb-4 sm:mb-8">
            <div class="w-full h-fit max-w-full overflow-x-hidden py-0">
                <AnimationRevealOnScroll :animation-class="'animate__fadeInDown'">
                    <span class="text-[6em] font-bold text-transparent text-stroke opacity-35 dark:text-stroke-dark whitespace-nowrap overflow-hidden text-ellipsis" >
                        {{ foYear(Number(item.year) % 100) }}
                    </span>
                </AnimationRevealOnScroll>
            </div>
            <div class="relative w-full h-full mb-4 grid grid-cols-1 mobile-pad:grid-cols-2 md:grid-cols-3 gap-4 border-b-[1px] border-r-[1px] border-gray-200 dark:border-gray-500/50">
                <AnimationRevealOnScroll v-for="demo in item.data" :key="demo.id" @click="toDetail(demo)" :animation-class="'animate__fadeInDown'" :base-class="'group flex p-2 items-center gap-4 hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100/5 rounded-base transition-all duration-300'">
                    <div class="max-w-12 py-2">
                        <Starport :port="demo.id" class="w-12 h-12 flex justify-center items-center">
                            <RecordDetailImage />
                        </Starport>
                    </div>
                    <div>
                        <ul>
                            <li class="text-gray-500 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{{ demo.title }}</li>
                            <li class="text-gray-400 text-sm group-hover:text-gray-500 dark:group-hover:text-gray-300">{{ demo.summary }}</li>
                        </ul>
                    </div>
                </AnimationRevealOnScroll>
            </div>
        </div> -->
        <main class="w-full mx-auto">
            <h1
                class="w-full text-base md:text-xl lg:text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary font-black">
                Work History</h1>
            <div class="w-full text-sm lg:text-base font-normal text-secondary mt-4">
                I'm a full-stack developer that loves 
                <span class="bg-neutral-100 px-1 py-0.5">building products</span> 
                and web apps that can impact
                millions of lives
            </div>
            <div class="w-full">
                <div class="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative">
                    <p class="text-sm lg:text-base font-normal text-secondary w-40">2022 - Present</p>
                    <div>
                        <h5
                            class="font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500">
                            Amazon</h5>
                        <p class="text-secondary text-base md:text-base lg:text-base font-semibold">Senior Software
                            Engineer</p>
                        <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm mb-4">Building the future of
                            e-commerce</p>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Developed a new feature
                                that improves the shopping experience1Developed a new feature
                                that improves the shopping experience1</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Implemented a
                                recommendation algorithm to suggest products</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Enhanced the checkout
                                process making it more intuitive and user-friendly</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Built a feature for
                                tracking packages in real-time</p>
                        </div>
                    </div>
                </div>
                <div class="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative">
                    <p class="text-sm lg:text-base font-normal text-secondary w-40">2021 - 2022</p>
                    <div>
                        <h5
                            class="__className_399708 font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500">
                            Google</h5>
                        <p class="text-secondary text-base md:text-base lg:text-base font-semibold">Senior Software
                            Engineer</p>
                        <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm mb-4">Building the future of
                            search</p>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Improved the search
                                algorithm to provide more relevant results</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Developed a new feature
                                that personalizes search results</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Enhanced the search
                                functionality making it more intuitive and user-friendly</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Implemented a feature
                                for tracking search history</p>
                        </div>
                    </div>
                </div>
                <div class="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative">
                    <p class="text-sm lg:text-base font-normal text-secondary w-40">2020 - 2021</p>
                    <div>
                        <h5
                            class="__className_399708 font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500">
                            Facebook</h5>
                        <p class="text-secondary text-base md:text-base lg:text-base font-semibold">Senior Software
                            Engineer</p>
                        <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm mb-4">Building the future of
                            social networking</p>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Developed a new feature
                                that improves the user experience</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Implemented a
                                recommendation algorithm to suggest friends</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Enhanced the news feed
                                algorithm to show more relevant posts</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Built a feature for
                                tracking user activity</p>
                        </div>
                    </div>
                </div>
                <div class="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative">
                    <p class="text-sm lg:text-base font-normal text-secondary w-40">2019 - 2020</p>
                    <div>
                        <h5
                            class="__className_399708 font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500">
                            Apple</h5>
                        <p class="text-secondary text-base md:text-base lg:text-base font-semibold">Senior Software
                            Engineer</p>
                        <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm mb-4">Building the future of
                            technology</p>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Improved the iOS
                                operating system to enhance user experience</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Developed a new feature
                                that personalizes user interface</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Enhanced the app store
                                algorithm to suggest more relevant apps</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Implemented a feature
                                for tracking app usage</p>
                        </div>
                    </div>
                </div>
                <div class="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative">
                    <p class="text-sm lg:text-base font-normal text-secondary w-40">2018 - 2019</p>
                    <div>
                        <h5
                            class="__className_399708 font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500">
                            Microsoft</h5>
                        <p class="text-secondary text-base md:text-base lg:text-base font-semibold">Senior Software
                            Engineer</p>
                        <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm mb-4">Building the future of
                            software</p>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Improved the Windows
                                operating system to enhance user experience</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Developed a new feature
                                that personalizes user interface</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Enhanced the office
                                suite to improve productivity</p>
                        </div>
                        <div class="flex space-x-1 items-start my-2"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" class="h-3 w-4 mt-1 text-neutral-300">
                                <path
                                    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                                    fill="currentColor" stroke-width="0"></path>
                            </svg>
                            <p class="font-normal text-secondary text-sm md:text-sm lg:text-sm">Implemented a feature
                                for tracking software usage</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style lang="postcss" scoped></style>