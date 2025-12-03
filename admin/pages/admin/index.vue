<script lang="ts" setup>
interface CardList {
	title: string;
	value: number;
	component: 'SuggestionList' | 'BlogList' | 'RecordList';
}

const components = {
	RecordList: resolveComponent('RecordList'),
	BlogList: resolveComponent('BlogList'),
	SuggestionList: resolveComponent('SuggestionList'),
};
const cardList = ref<CardList[]>([
	{ title: '建议数', value: 32, component: 'SuggestionList' },
	{ title: '记录数', value: 128, component: 'RecordList' },
	{ title: '博客数', value: 64, component: 'BlogList' },
]);
const activeComponentName = ref<CardList['component']>('SuggestionList');
</script>

<template>
	<AdminFormMain title="后台首页">
		<div class="mb-4 grid w-full grid-cols-1 gap-2 *:gap-4 md:grid-cols-2 xl:grid-cols-3">
			<ElCard v-for="item in cardList" :key="item.value" shadow="hover"
				class="!min-h-[128px] !cursor-pointer !rounded-md" @click="activeComponentName = item.component">
				<div class="flex h-full w-full items-center justify-between gap-1">
					<Icon name="mdi-chart-box-outline" class="mr-2 inline-block" width="32" />
					<div class="flex-1">
						<p class="text-sm text-gray-500">{{ item.title }}</p>
						<p class="text-2xl font-bold">{{ item.value }}</p>
					</div>
					<div class="aspect-square h-full bg-pink-300" />
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
