<script lang="ts" setup>
import type { CreateErrorMessageDto } from '~/server/dto/CreateErrorMessageDto';

const pageSize = ref<number>(10);
const pageNumber = ref<number>(1);
watch(pageSize, () => {
	pageNumber.value = 1;
});
const { data, refresh } = await useAsyncData(
	'errorList',
	() =>
		fetchErrorList({
			pageNumber: pageNumber.value,
			pageSize: pageSize.value,
		}),
	{
		watch: [pageNumber],
	},
);

const tableData = computed<CreateErrorMessageDto[]>(() => data.value?.data?.records || []);
const total = computed<number>(() => data.value?.data?.total || 0);

// 分页查询
const handleCurrentChange = (val: number): void => {
	pageNumber.value = val;
};

// 每页条数改变
const handleSizeChange = (val: number): void => {
	pageSize.value = val;
};

// 删除错误信息
const deleteErrorClick = async (id: number) => {
	useConfirm('删除错误信息', 'warning', async () => {
		const res = await deleteError(id);

		res.data && refresh();
	});
};
</script>

<template>
	<TableHeight>
		<template #default="{ height }">
			<ElTable :data="tableData" stripe :height="height" class="w-full !text-[16px]">
				<ElTableColumn fixed prop="id" label="ID" width="80" />
				<ElTableColumn prop="name" label="名称" width="120" />
				<ElTableColumn prop="email" label="邮箱" width="280" />
				<ElTableColumn prop="content" label="内容" show-overflow-tooltip />
				<ElTableColumn label="操作" width="100">
					<template #default="scope">
						<ElButton link type="danger" class="!text-[16px]" size="small"
							@click="deleteErrorClick(scope.row.id)">
							删除
						</ElButton>
					</template>
				</ElTableColumn>
			</ElTable>
		</template>
	</TableHeight>

	<AdminFormPagination :total="total" :page-number="pageNumber" :page-size="pageSize"
		@handle-current-change="handleCurrentChange" @handle-size-change="handleSizeChange" />
</template>

<style lang="scss" scoped></style>
