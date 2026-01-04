<script lang='ts' setup>
import type { TocLink } from '@nuxt/content';
import type { CSSProperties } from 'vue';

const { menuList, level = 1 } = defineProps<{
	menuList: TocLink[]
	level?: number
}>()

const css = computed<CSSProperties>(() => ({
	marginLeft: `${level * 8}px`,
}))
</script>

<template>
	<ul class="hidden group-hover:block max-w-[200px] leading-6 truncate">
		<li v-for="(nav, index) in menuList || []" :key="index" v-bind="$attrs">
			<a :href="`#${nav.id}`"
				class="text-[0.8em] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors border-b border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400">
				{{ nav.text }}
			</a>
			<template v-if="nav.children && nav.children.length > 0">
				<ContentMenu :menu-list="nav.children" :level="level + 1" :style="css" />
			</template>
		</li>
	</ul>
</template>

<style lang='scss' scoped></style>
