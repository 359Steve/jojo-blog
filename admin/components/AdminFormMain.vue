<script lang="ts" setup>
const { title } = defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<h3 class="mb-2 font-bold">
			{{ title }}
		</h3>
		<slot />
	</div>
</template>

<style lang="postcss" scoped>
:deep(.save .el-form-item__content) {
	@apply justify-end;
}

:deep(.el-form-item__label) {
	@apply pr-0 text-[16px];
}

:deep(.el-input__wrapper) {
	@apply h-[34px] text-[14px];
}

:deep(.el-select__wrapper) {
	@apply h-[34px] text-[14px];
}

:deep(.el-table__inner-wrapper::before) {
	@apply hidden;
}

:deep(.el-date-editor) {
	@apply w-full;
}

:deep(.el-upload-dragger) {
	@apply h-[200px] w-[200px];
}

:deep(.el-image) {
	@apply h-full w-full object-cover;
}
</style>
