<script lang="ts" setup>
const show = defineModel<boolean>('show');
const inputRef = useTemplateRef('inputRef');
const keyword = ref<string>('');

const handleClose = (): void => {
	show.value = false;
};

const handleSearch = (value: string): void => {
	console.log(value);
};
</script>

<template>
	<ElDialog v-model="show" top="5vh" class="!w-[80vw] rounded-[6px] sm:!w-[40vw]" :show-close="false"
		:before-close="handleClose" append-to-body @opened="inputRef!.focus()" @closed="inputRef!.blur()">
		<ElInput ref="inputRef" v-model="keyword" size="large" clearable placeholder="搜索菜单（支持拼音搜索）"
			@input="handleSearch">
			<template #prefix>
				<Icon icon="ri:search-line" width="20" height="20"></Icon>
			</template>
		</ElInput>
		<div class="search-content">
			<ElScrollbar ref="scrollbarRef" max-height="calc(90vh - 140px)">
				<ElEmpty description="暂无搜索结果" />
			</ElScrollbar>
		</div>
		<template #footer>
			<SearchFooter />
		</template>
	</ElDialog>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper.is-focus) {
	@apply !shadow-[0_0_0_1px_#409EFF_inset];
}

:deep(.el-input__wrapper.is-focus svg) {
	@apply text-[#409EFF];
}
</style>
