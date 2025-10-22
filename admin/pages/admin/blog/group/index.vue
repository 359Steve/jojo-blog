<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { BlogTagDto } from '~/server/dto/CreateBlogTagDto';

const pageSize = ref<number>(10);
const pageNumber = ref<number>(1);
const { data } = await useAsyncData('queryBlogList', () =>
	getBlogList({
		pageNumber: pageNumber.value,
		pageSize: pageSize.value,
	}),
);
const tableData = ref<BlogWithTagsRep<CreateBlogDto, BlogTagDto, 'tags'>[]>(data.value?.data?.records || []);
const total = ref<number>(data.value?.data?.total || 0);
const loading = ref<boolean>(false);
const keyword = ref<string>('');
const tableRefs = useTemplateRef<HTMLDivElement>('tableRefs');
const tableRefsHeight = ref<number>(0);

// 查询全部博客
const queryBlog = async (keyword: string = '', page: number = 1, size: number = 10) => {
	loading.value = true;
	try {
		const { data } = await getBlogList({
			keyword,
			pageSize: size,
			pageNumber: page,
		});

		tableData.value = data?.records || [];
		total.value = data?.total || 0;
	} catch (error) {
		ElMessage.error('查询博客失败');
	} finally {
		loading.value = false;
	}
};

// 搜索博客
const handleSearch = () => {
	pageNumber.value = 1;
	queryBlog(keyword.value, 1, pageSize.value);
};

// 添加搜索防抖
let searchTimeout: NodeJS.Timeout;
watch(keyword, (newValue) => {
	clearTimeout(searchTimeout);
	searchTimeout = setTimeout(() => {
		pageNumber.value = 1;
		queryBlog(newValue, 1, pageSize.value);
	}, 300);
});

// 每页条数改变
const handleSizeChange = (val: number) => {
	pageSize.value = val;
	pageNumber.value = 1;
	queryBlog(keyword.value, 1, val);
};

// 当前页改变
const handleCurrentChange = (val: number) => {
	pageNumber.value = val;
	queryBlog(keyword.value, val, pageSize.value);
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
		try {
			const { data, msg } = await deleteBlog(id);

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg,
			});

			if (data) {
				if (tableData.value.length === 1 && pageNumber.value > 1) {
					pageNumber.value -= 1;
				}
				queryBlog(keyword.value, pageNumber.value, pageSize.value);
			}
		} catch (error) {
			ElMessage.error('删除失败，请重试');
		}
	});
};

onMounted(() => {
	nextTick(() => {
		if (tableRefs.value) {
			tableRefsHeight.value = tableRefs.value?.offsetHeight || 0;
		}
	});
});
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<h3 class="mb-2 font-bold">博客管理</h3>
		<div class="mb-2 flex items-center justify-between gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3">
			<div class="flex items-center gap-2 sm:gap-4">
				<ElInput v-model="keyword" placeholder="搜索标题或简介" clearable @keyup.enter="handleSearch" />
				<ElButton type="primary" @click="handleSearch">搜索</ElButton>
			</div>
			<div class="flex items-center justify-end md:col-span-2">
				<ElButton type="primary" @click="goCreate">新增博客</ElButton>
			</div>
		</div>

		<div ref="tableRefs" class="w-full flex-1">
			<ElTable v-loading="loading" :data="tableData" :height="tableRefsHeight" stripe
				class="!w-full !text-[16px]">
				<ElTableColumn fixed prop="id" label="ID" width="80" />
				<ElTableColumn prop="title" label="标题" />
				<ElTableColumn prop="subtitle" label="简介" />
				<ElTableColumn label="标签">
					<template #default="{ row }">
						<template v-if="row.tags && row.tags.length">
							<ElTag v-for="t in row.tags" :key="t.tag.id" size="small" class="!text-[14px]">
								{{ t.tag.name }}
							</ElTag>
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
						<ElButton link type="danger" size="small" class="!text-[16px]" @click="handleDelete(row.id)">
							删除
						</ElButton>
					</template>
				</ElTableColumn>
			</ElTable>
		</div>

		<div class="mt-2 flex justify-end">
			<ElPagination background layout="total, sizes, prev, pager, next" :total="total" :page-size="pageSize"
				:current-page="pageNumber" :page-sizes="[10, 20, 50, 100]" @current-change="handleCurrentChange"
				@size-change="handleSizeChange" />
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper) {
	@apply h-[34px] text-[14px];
}
</style>
