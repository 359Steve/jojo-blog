<script lang="ts" setup>
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';
import { ElFormItem, type FormRules } from 'element-plus';

const pageSize = ref<number>(10);
const pageNumber = ref<number>(1);
const loading = ref<boolean>(false);
const isEdit = ref<boolean>(false);
const ruleFormRef = templateRef('ruleFormRef');
const { data, refresh } = await useAsyncData('recordGroups', () => queryGroupAll(pageNumber.value, pageSize.value), {
	watch: [pageNumber, pageSize],
});
const tableData = computed<CreateGroupDto[]>(() => data.value?.data?.records || []);
const total = computed<number>(() => data.value?.data?.total || 0);

const formData = reactive<CreateGroupDto>({
	time_range: '',
	title: '',
	role: '',
	summary: '',
});

const createRules = reactive<FormRules>({
	time_range: [{ required: true, message: '请选择年份', trigger: 'blur' }],
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	role: [{ required: true, message: '请输入角色/简介', trigger: 'blur' }],
	summary: [{ required: true, message: '请输入描述', trigger: 'blur' }],
});

// 重置表单
const resetForm = () => {
	isEdit.value = false;
	formData.id = undefined;
	formData.time_range = '';
	formData.title = '';
	formData.role = '';
	formData.summary = '';
	ruleFormRef.value?.resetFields?.();
};

const handleSizeChange = (val: number) => {
	pageSize.value = val;
	pageNumber.value = 1;
};

// 分页
const handleCurrentChange = (val: number) => {
	pageNumber.value = val;
};

// 编辑分组
const goEdit = (row: CreateGroupDto) => {
	isEdit.value = true;
	formData.id = row.id;
	formData.time_range = row.time_range;
	formData.title = row.title;
	formData.role = row.role;
	formData.summary = row.summary;
};

// 新增/修改
const saveGroup = async (formEl: any) => {
	formEl?.validate(async (valid: boolean) => {
		if (valid) {
			loading.value = true;
			try {
				if (isEdit.value && formData.id) {
					const res = await updateGroup(formData);

					if (res.data) {
						resetForm();
						refresh();
					}
				} else {
					const res = await createGroup(formData);
					if (res.data) {
						resetForm();
						refresh();
					}
				}
			} finally {
				loading.value = false;
			}
		}
	});
};

// 删除分组
const handleDelete = async (id: number) => {
	useConfirm('删除分组', 'warning', async () => {
		const res = await deleteGroup(id);
		if (res.data) {
			if (tableData.value.length === 1 && pageNumber.value > 1) pageNumber.value -= 1;
			refresh();
		}
	});
};

// 格式化年份
const handleDateChange = (value: string) => {
	const year = new Date(value).getFullYear().toString();
	formData.time_range = year;
};
</script>

<template>
	<AdminFormMain title="分组管理">
		<ElForm ref="ruleFormRef" :model="formData" :inline="true" :rules="createRules"
			class="!grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4">
			<ElFormItem prop="time_range" class="!mx-0 !w-full" label="年份：">
				<ElDatePicker v-model="formData.time_range" type="year" placeholder="请选择年份"
					@change="handleDateChange" />
			</ElFormItem>
			<ElFormItem prop="title" class="!mx-0 !w-full" label="标题：">
				<ElInput v-model="formData.title" placeholder="请输入标题" />
			</ElFormItem>
			<ElFormItem prop="role" class="!mx-0 !w-full" label="简介：">
				<ElInput v-model="formData.role" placeholder="请输入简介" />
			</ElFormItem>
			<ElFormItem prop="summary" class="!mx-0 !w-full" label="描述：">
				<ElInput v-model="formData.summary" placeholder="请输入描述" />
			</ElFormItem>
			<ElFormItem class="save col-span-1 !mx-0 !w-full sm:col-span-2">
				<ElButton v-if="!isEdit" :loading="loading" type="primary" @click="saveGroup(ruleFormRef!)">
					新增
				</ElButton>
				<ElButton v-else :loading="loading" type="primary" @click="saveGroup(ruleFormRef!)">修改</ElButton>
				<ElButton v-if="isEdit" plain @click="resetForm">取消</ElButton>
			</ElFormItem>
		</ElForm>

		<TableHeight>
			<template #default="{ height }">
				<ElTable v-loading="loading" :data="tableData" :height="height" stripe class="!w-full !text-[16px]">
					<ElTableColumn fixed prop="id" label="ID" width="80" />
					<ElTableColumn prop="time_range" label="年份" width="120" />
					<ElTableColumn prop="title" label="标题" show-overflow-tooltip />
					<ElTableColumn prop="role" label="简介" show-overflow-tooltip />
					<ElTableColumn prop="summary" label="描述" show-overflow-tooltip />
					<ElTableColumn label="数量" width="120">
						<template #default="{ row }">
							<template v-if="row._count">
								{{ row._count.details }}
							</template>
							<template v-else>—</template>
						</template>
					</ElTableColumn>
					<ElTableColumn label="操作" width="220">
						<template #default="{ row }">
							<ElButton link class="!text-[16px]" type="primary" size="small" @click="goEdit(row)">
								编辑
							</ElButton>
							<ElButton link class="!text-[16px]" type="danger" size="small"
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

<style lang="postcss" scoped>
:deep(.el-date-editor) {
	@apply !w-full;
}
</style>
