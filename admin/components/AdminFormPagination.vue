<script lang="ts" setup>
const { total } = defineProps<{
	total: number;
	pageSize: number;
	pageNumber: number;
}>();

const emits = defineEmits<{
	(event: 'handleCurrentChange' | 'handleSizeChange', value: number): void;
}>();
</script>

<template>
	<div class="mt-2 flex w-full justify-end">
		<ElPagination background layout="total, sizes, prev, pager, next" :total="total" :page-size="pageSize"
			:current-page="pageNumber" :page-sizes="[10, 20, 50, 100]"
			@current-change="emits('handleCurrentChange', $event)" @size-change="emits('handleSizeChange', $event)" />
	</div>
</template>

<style lang="scss" scoped></style>
