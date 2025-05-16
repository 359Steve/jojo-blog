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
        <div v-for="item in summaryList" :key="item.id" class="relative w-full mb-4 sm:mb-8">
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
        </div>
    </div>
</template>

<style lang="postcss" scoped>

</style>