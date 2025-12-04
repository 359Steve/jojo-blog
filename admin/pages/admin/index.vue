<script lang="ts" setup>
interface CardList {
	icon: string;
	color: string;
	title: string;
	value: number;
	increment: number;
	component: 'SuggestionList' | 'BlogList' | 'RecordList';
}

const cardList = ref<CardList[]>([
	{
		icon: 'material-symbols:area-chart',
		color: 'text-blue-500',
		title: '问题反馈数量',
		value: 0,
		increment: 0,
		component: 'SuggestionList',
	},
	{
		icon: 'material-symbols:area-chart-outline',
		color: 'text-green-500',
		title: '记录浏览总数',
		value: 0,
		increment: 0,
		component: 'RecordList',
	},
	{
		icon: 'mdi:chart-areaspline',
		color: 'text-purple-500',
		title: '博客浏览总数',
		value: 0,
		increment: 0,
		component: 'BlogList',
	},
]);
const { data } = await useAsyncData('adminStatistical', () => getStatisticalAll());
const newCardList = computed(() => {
	const stats = data.value?.data ?? {};
	return cardList.value
		.map((item) => {
			if (stats[item.component] && stats[item.component].type === item.component) {
				return {
					...item,
					value: stats[item.component].value,
					increment: stats[item.component].increment,
				};
			}
			return undefined;
		})
		.filter((item) => item !== undefined);
});

const components = {
	RecordList: resolveComponent('RecordList'),
	BlogList: resolveComponent('BlogList'),
	SuggestionList: resolveComponent('SuggestionList'),
};

const activeComponentName = ref<CardList['component']>('SuggestionList');
</script>

<template>
	<AdminFormMain title="后台首页">
		<div class="mb-4 grid w-full grid-cols-1 gap-2 *:gap-4 md:grid-cols-2 xl:grid-cols-3">
			<ElCard v-for="item in newCardList" :key="item.value" shadow="never"
				class="!min-h-[128px] !cursor-pointer !rounded-md" :class="[
					activeComponentName === item.component ? 'shadow-[0px_0px_12px_rgba(0,0,0,0.12)]' : 'shadow-none',
				]" @click="activeComponentName = item.component">
				<div class="flex h-full w-full items-center justify-between gap-1">
					<Icon :icon="item.icon" class="mr-2 inline-block" :class="[item.color]" width="65" />
					<div class="flex flex-1 flex-col justify-center">
						<p class="text-sm font-semibold text-gray-500">{{ item.title }}</p>
						<p class="text-2xl font-bold" :class="[item.color]">{{ item.value }}</p>
					</div>
					<div class="aspect-square h-full">
						<div class="flex items-center justify-center">
							<Icon icon="mdi:chart-finance" :class="[item.color]" width="56" />
						</div>
						<div class="text-center text-[16px]">
							<span>今日：{{ item.increment }}</span>
						</div>
					</div>
				</div>
			</ElCard>
		</div>

		<component :is="components[activeComponentName]" />
	</AdminFormMain>
</template>

<style lang="postcss" scoped>
:deep(.el-card__body) {
	@apply h-full;
}
</style>
