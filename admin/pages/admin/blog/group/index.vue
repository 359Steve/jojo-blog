<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

const pageSize = ref<number>(10);
const pageNumber = ref<number>(1);
const keyword = ref<string>('');
const debouncedSearch = useDebounce(keyword, 300);
watch(debouncedSearch, () => {
	pageNumber.value = 1;
});
const { data, refresh } = await useAsyncData(
	'queryBlogList',
	() =>
		getBlogList({
			pageNumber: pageNumber.value,
			pageSize: pageSize.value,
			keyword: debouncedSearch.value,
		}),
	{
		watch: [pageNumber, debouncedSearch],
	},
);
const tableData = computed<BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]>(
	() => data.value?.data?.records || [],
);
const total = computed<number>(() => data.value?.data?.total || 0);
const loading = ref<boolean>(false);

// 每页条数改变
const handleSizeChange = (val: number) => {
	pageSize.value = val;
	pageNumber.value = 1;
};

// 当前页改变
const handleCurrentChange = (val: number) => {
	pageNumber.value = val;
};

const goCreate = () => {
	navigateTo('/admin/blog/add');
};

const goEdit = (id: number) => {
	navigateTo({ path: '/admin/blog/add', query: { id } });
};

// 删除博客
const handleDelete = async (id: number) => {
	useConfirm('删除博客', 'warning', async () => {
		const { data } = await deleteBlog(id);
		data && refresh();
	});
};
</script>

<template>
	<AdminFormMain title="博客管理">
		<div class="mb-2 flex items-center justify-between gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3">
			<div class="flex items-center gap-2 sm:gap-4">
				<ElInput v-model="keyword" placeholder="搜索标题或简介" clearable />
			</div>
			<div class="flex items-center justify-end md:col-span-2">
				<ElButton type="primary" @click="goCreate">新增博客</ElButton>
			</div>
		</div>

		<TableHeight>
			<template #default="{ height }">
				<ElTable v-loading="loading" :data="tableData" :height="height" stripe class="!w-full !text-[16px]">
					<ElTableColumn fixed prop="id" label="ID" width="80" />
					<ElTableColumn prop="title" label="标题" width="200" show-overflow-tooltip />
					<ElTableColumn prop="subtitle" label="简介" show-overflow-tooltip />
					<ElTableColumn label="标签" width="200">
						<template #default="{ row }">
							<template v-if="row.tags && row.tags.length">
								<div class="flex flex-wrap items-center gap-1 overflow-hidden">
									<ElTag v-for="t in row.tags" :key="t.tag.id" size="small"
										class="max-w-[80px] truncate !text-[12px]" :title="t.tag.name">
										{{ t.tag.name }}
									</ElTag>
								</div>
							</template>
							<template v-else>—</template>
						</template>
					</ElTableColumn>
					<ElTableColumn prop="created_at" label="创建时间" width="180">
						<template #default="{ row }">{{ new Date(row.created_at).toLocaleString() }}</template>
					</ElTableColumn>
					<ElTableColumn prop="updated_at" label="更新时间" width="180">
						<template #default="{ row }">{{ new Date(row.updated_at).toLocaleString() }}</template>
					</ElTableColumn>
					<ElTableColumn label="操作" width="200">
						<template #default="{ row }">
							<ElButton link type="primary" size="small" class="!text-[16px]" @click="goEdit(row.id)">
								编辑
							</ElButton>
							<ElButton link type="danger" size="small" class="!text-[16px]"
								@click="handleDelete(row.id)">
								删除
							</ElButton>
						</template>
					</ElTableColumn>
				</ElTable>
			</template>
		</TableHeight>

		<AdminFormPagination :total="total" :page-number="pageNumber" :page-size="pageSize"
			@handle-current-change="handleCurrentChange" @handle-size-change="handleSizeChange" />
	</AdminFormMain>
</template>

<style lang="postcss" scoped></style>
