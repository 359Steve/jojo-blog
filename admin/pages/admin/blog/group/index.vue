<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');

const pagination = reactive({ page: 1, limit: 10, total: 0, totalPages: 0 });

const fetchList = async (page = 1) => {
	loading.value = true;
	try {
		const res: any = await $fetch('/api/blog/blogList', {
			params: { page, limit: pagination.limit, keyword: keyword.value },
		});

		// 支持后端返回 returnData({ data: {...} }) 或 直接返回数据
		const payload = res?.data ?? res;
		if (payload && payload.list) {
			list.value = payload.list;
			pagination.total = payload.total ?? 0;
			pagination.page = payload.page ?? page;
			pagination.limit = payload.limit ?? pagination.limit;
			pagination.totalPages = payload.totalPages ?? Math.ceil(pagination.total / pagination.limit);
		} else {
			list.value = [];
			pagination.total = 0;
			pagination.totalPages = 0;
		}
	} catch (err) {
		console.error('获取博客列表失败', err);
		ElMessage.error('获取博客列表失败');
	} finally {
		loading.value = false;
	}
};

const handleSearch = () => {
	pagination.page = 1;
	fetchList(1);
};

const handleSizeChange = (val: number) => {
	pagination.limit = val;
	fetchList(1);
};

const handleCurrentChange = (val: number) => {
	pagination.page = val;
	fetchList(val);
};

const goCreate = () => {
	router.push('/admin/blog/add');
};

const goEdit = (id: number) => {
	router.push(`/admin/blog/edit/${id}`);
};

const handleDelete = async (id: number) => {
	try {
		await ElMessageBox.confirm('确认删除该博客吗？', '提示', { type: 'warning' });
		const res = await $fetch('/api/blog/blogDelete', { method: 'DELETE', body: { id } });
		const payload = res?.data ?? res;
		if (payload) {
			ElMessage.success('删除成功');
			fetchList(pagination.page);
		} else {
			ElMessage.error('删除失败');
		}
	} catch (err: any) {
		if (err === 'cancel' || (err && typeof err.message === 'string' && err.message.includes('cancel'))) return;
		console.error('删除失败', err);
		ElMessage.error('删除失败');
	}
};

onMounted(() => {
	fetchList(1);
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

		<div class="w-full flex-1">
			<ElTable v-loading="loading" :data="list" stripe class="!h-full !w-full !text-[16px]">
				<ElTableColumn prop="id" label="ID" width="80" />
				<ElTableColumn prop="title" label="标题" />
				<ElTableColumn prop="subtitle" label="简介" />
				<ElTableColumn label="标签">
					<template #default="{ row }">
						<template v-if="row.tags && row.tags.length">
							<ElTag v-for="t in row.tags" :key="t.tag.id" size="small" style="margin-right: 6px">
								{{ t.tag.name }}
							</ElTag>
						</template>
						<template v-else>—</template>
					</template>
				</ElTableColumn>
				<ElTableColumn prop="created_at" label="创建时间" width="180">
					<template #default="{ row }">{{ new Date(row.created_at).toLocaleString() }}</template>
				</ElTableColumn>
				<ElTableColumn label="操作" width="200">
					<template #default="{ row }">
						<ElButton type="primary" size="small" @click="goEdit(row.id)">编辑</ElButton>
						<ElButton type="danger" size="small" style="margin-left: 8px" @click="handleDelete(row.id)">
							删除
						</ElButton>
					</template>
				</ElTableColumn>
			</ElTable>
		</div>

		<div class="mt-4 flex justify-end">
			<ElPagination :current-page="pagination.page" :page-size="pagination.limit" :total="pagination.total"
				layout="prev, pager, next, sizes, total" :page-sizes="[10, 20, 50]" @size-change="handleSizeChange"
				@current-change="handleCurrentChange" />
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-input__wrapper) {
	@apply h-[34px] text-[14px];
}
</style>
