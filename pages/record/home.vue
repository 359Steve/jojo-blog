<script lang="ts" setup>
import type { RecordSummary, Summary } from '~/types/com-types';

const summaryList = reactive<RecordSummary[]>([
	{
		id: '1',
		timeRange: '2025',
		title: '起点 · 初识前端',
		role: '前端学习者（萌新）',
		summary: '从B站与HTML入门，掌握HTML、CSS与JavaScript基础，开启前端之旅。',
		data: [
			{
				id: '1-1',
				icon: 'ri-bilibili-fill',
				title: 'BiliBili',
				summary: '第一次接触前端，始于TXT编写HTML',
				timeRange: '2020'
			},
			{
				id: '1-2',
				icon: 'ri-html5-fill',
				title: 'HTML基础',
				summary: '掌握基础标签、结构、语义化等知识',
				timeRange: '2020'
			},
			{
				id: '1-3',
				icon: 'ri-css3-fill',
				title: 'CSS入门',
				summary: '学习盒模型、选择器、定位等基本布局技能',
				timeRange: '2020'
			},
			{
				id: '1-4',
				icon: 'ri-javascript-fill',
				title: 'JavaScript初识',
				summary: '开始了解变量、函数、事件处理等基础语法',
				timeRange: '2020'
			}
		]
	},
	{
		id: '2',
		timeRange: '2024',
		title: '起步 · 实战应用',
		role: '静态网页开发者',
		summary: '完成第一个项目实践，掌握开发工具与版本控制，初探响应式与React框架。',
		data: [
			{
				id: '2-1',
				icon: 'ri-code-box-line',
				title: '项目实战',
				summary: '独立完成第一个静态网页项目',
				timeRange: '2021'
			},
			{
				id: '2-2',
				icon: 'ri-git-merge-line',
				title: 'Git/GitHub',
				summary: '学习版本控制工具，掌握基础命令与协作',
				timeRange: '2021'
			},
			{
				id: '2-3',
				icon: 'ri-terminal-box-line',
				title: '开发工具',
				summary: '熟悉 VSCode、Chrome DevTools 等工具使用',
				timeRange: '2021'
			},
			{
				id: '2-4',
				icon: 'ri-reactjs-line',
				title: '初识React',
				summary: '尝试使用React构建简单组件',
				timeRange: '2021'
			},
			{
				id: '2-5',
				icon: 'ri-layout-masonry-line',
				title: '响应式布局',
				summary: '学习媒体查询，适配移动端设备',
				timeRange: '2021'
			}
		]
	},
	{
		id: '3',
		timeRange: '2023',
		title: '进阶 · 框架与后端启蒙',
		role: '前后端初级开发者',
		summary: '深入学习Vue全家桶与Node后端，掌握接口联调、组件化及前后端分离实践。',
		data: [
			{
				id: '3-1',
				icon: 'ri-vuejs-fill',
				title: '深入Vue',
				summary: '系统学习Vue 2与Vue 3，掌握组件通信、生命周期',
				timeRange: '2022'
			},
			{
				id: '3-2',
				icon: 'ri-vuejs-line',
				title: 'Vue Router & Vuex',
				summary: '实现前端路由和状态管理',
				timeRange: '2022'
			},
			{
				id: '3-3',
				icon: 'ri-server-line',
				title: 'Node.js入门',
				summary: '学习使用Express搭建简单后端接口',
				timeRange: '2022'
			},
			{
				id: '3-4',
				icon: 'ri-database-2-line',
				title: 'MongoDB初探',
				summary: '了解NoSQL数据库基本概念',
				timeRange: '2022'
			},
			{
				id: '3-5',
				icon: 'ri-dashboard-line',
				title: 'Element UI实践',
				summary: '用组件库构建后台管理系统',
				timeRange: '2022'
			},
			{
				id: '3-6',
				icon: 'ri-links-line',
				title: '接口联调',
				summary: '掌握axios与后端接口的数据交互',
				timeRange: '2022'
			}
		]
	},
	{
		id: '4',
		timeRange: '2022',
		title: '提升 · 工程化与可视化',
		role: '全栈开发探索者',
		summary: '引入TypeScript与Vite，提升工程效率，尝试Electron与动画交互实现复杂功能。',
		data: [
			{
				id: '4-1',
				icon: 'ri-code-s-slash-line',
				title: 'TypeScript应用',
				summary: '在Vue项目中引入并实践TypeScript',
				timeRange: '2023'
			},
			{
				id: '4-2',
				icon: 'ri-terminal-window-line',
				title: 'Vite生态',
				summary: '从Webpack转向Vite，提升开发效率',
				timeRange: '2023'
			},
			{
				id: '4-3',
				icon: 'ri-brush-line',
				title: '组件库开发',
				summary: '尝试封装通用业务组件，提高复用性',
				timeRange: '2023'
			},
			{
				id: '4-4',
				icon: 'ri-sparkling-2-line',
				title: '动画与交互',
				summary: '学习GSAP、ScrollTrigger实现页面动效',
				timeRange: '2023'
			},
			{
				id: '4-5',
				icon: 'ri-macbook-line',
				title: 'Electron尝试',
				summary: '构建桌面应用并与本地文件系统交互',
				timeRange: '2023'
			}
		]
	},
	{
		id: '5',
		timeRange: '2021',
		title: '基础能力提升',
		role: '前端进阶学习者',
		summary: '这一阶段聚焦于浏览器机制、网页布局、构建工具等核心概念的理解与实践，进一步夯实前端工程基础。',
		data: [
			{
				id: '5-1',
				icon: 'ri-lightbulb-flash-line',
				title: '前端思维建立',
				summary: '理解DOM、BOM，学习调试流程和浏览器工作机制',
				timeRange: '2021'
			},
			{
				id: '5-2',
				icon: 'ri-layout-2-line',
				title: '页面结构优化',
				summary: '掌握常见网页布局方式如Flex与Grid',
				timeRange: '2021'
			},
			{
				id: '5-3',
				icon: 'ri-settings-3-line',
				title: '构建工具初探',
				summary: '了解Webpack基础配置与打包流程',
				timeRange: '2021'
			},
			{
				id: '5-4',
				icon: 'ri-smartphone-line',
				title: '移动端适配',
				summary: '学习viewport与rem布局，适配不同屏幕设备',
				timeRange: '2021'
			},
			{
				id: '5-5',
				icon: 'ri-global-line',
				title: '浏览器兼容性',
				summary: '理解不同浏览器差异，解决基础兼容性问题',
				timeRange: '2021'
			}
		]
	}
]);

const toDetail = (item: Summary): void => {
	navigateTo({ path: '/record/detail', query: { id: item.id } });
};

const getItemTime = computed(() => {
	return (id: number): string =>
		id > 0 ? `${summaryList[id].timeRange} - ${summaryList[id - 1].timeRange}` : `${summaryList[id].timeRange} - 现在`;
});
</script>

<template>
	<div class="mx-auto w-full sm:w-[75%]">
		<RecordHeader />
		<main class="mx-auto w-full">
			<div class="w-full">
				<AnimationRevealOnScroll v-for="(item, index) in summaryList" :key="item.id"
					animation-class="animate__fadeInDown"
					base-class="flex sm:flex-row flex-col space-x-10 my-16 relative">
					<p class="text-secondary mb-4 ml-0 w-40 text-sm font-normal sm:mb-0 lg:text-base">{{
						getItemTime(index) }}</p>
					<div>
						<h5
							class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-base font-semibold text-emerald-500 md:text-lg lg:text-lg">
							{{ item.title }}
						</h5>
						<p class="text-secondary text-[18px] font-semibold sm:text-base">
							{{ item.role }}
						</p>
						<p class="text-secondary mb-4 text-[16px] font-normal sm:text-sm">
							{{ item.summary }}
						</p>
						<div v-for="demo in item.data" :key="demo.id"
							class="group my-2 flex cursor-pointer items-start space-x-1" @click="toDetail(demo)">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" class="mt-1 h-3 w-4 text-neutral-300">
								<path
									d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
									fill="currentColor" stroke-width="0"></path>
							</svg>
							<p class="text-secondary underline-animate text-sm font-normal md:text-sm lg:text-sm">
								{{ demo.summary }}
							</p>
						</div>
					</div>
				</AnimationRevealOnScroll>
			</div>
		</main>
	</div>
</template>

<style lang="postcss" scoped>
.underline-animate {
	position: relative;
	display: inline-block;
}

.underline-animate::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	height: 1px;
	width: 100%;
	background-color: currentColor;
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.3s ease;
}

.group:hover .underline-animate::after {
	transform: scaleX(1);
	transform-origin: left;
}

.group:not(:hover) .underline-animate::after {
	transform-origin: right;
}
</style>
