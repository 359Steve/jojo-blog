<script lang="ts" setup>
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import { ElFormItem, ElPopover, type FormInstance, type FormRules } from 'element-plus';

enum TagType {
	BLOG = '博客',
	PERSON = '个人',
}

const ruleFormRef = templateRef('ruleFormRef');
const formData = reactive<CreateTagDto>({
	name: '',
	icon: '',
	url: '',
	type: 'BLOG',
});

const { data } = await useAsyncData('tags', () => queryTagAll());
const tableData = ref<CreateTagDto[]>(data.value?.data?.records || []);
const total = ref<number>(data.value?.data?.total || 0);
const pageNumber = ref<number>(1);
const pageSize = ref<number>(10);
const searchTag = ref<string>('');
const isEdit = ref<boolean>(false);
const loading = ref<boolean>(false);

const rulesText = (value: string): boolean => {
	return /^[a-z0-9]+:[a-z0-9-_]+$/i.test(value);
};

// 创建规则
const createTagRules = reactive<FormRules>({
	name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
	icon: [
		{
			required: true,
			validator: (_rule: any, value: string, callback: any) => {
				if (!value) {
					callback(new Error('请输入图标名称'));
				} else if (rulesText(value)) {
					callback();
				} else {
					callback(new Error('图标名称格式不正确'));
				}
			},
			trigger: 'blur',
		},
	],
	url: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
	type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
});

const isIDisabled = computed(() => {
	return !formData.name || !formData.icon || !formData.url || !formData.type;
});

// 重置表单
const resetForm = () => {
	formData.name = '';
	formData.icon = '';
	formData.url = '';
	formData.type = 'BLOG';
	delete formData.id;
	isEdit.value = false;
	ruleFormRef.value?.resetFields();
};

// 查询全部标签
const queryTag = async (name: string = '', page: number = 1) => {
	loading.value = true;
	try {
		const { data } = await queryTagAll(name, page, pageSize.value);

		tableData.value = data!.records;
		total.value = data!.total;
	} catch (error) {
		ElMessage.error('查询标签失败');
	} finally {
		loading.value = false;
	}
};

// 新增标签
const createTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				const { data, msg } = await createTags(formData);

				ElMessage({
					type: data ? 'success' : 'error',
					message: msg,
				});

				if (data) {
					resetForm();
					queryTag(searchTag.value, pageNumber.value);
				}
			} finally {
				loading.value = false;
			}
		}
	});
};

// 修改标签
const updateTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				const { data, msg } = await updateTags(formData);

				ElMessage({
					type: data ? 'success' : 'error',
					message: msg,
				});

				if (data) {
					for (const item of tableData.value) {
						if (item.id === formData.id) {
							Object.assign(item, formData);
							break;
						}
					}
					resetForm();
				}
			} finally {
				loading.value = false;
			}
		}
	});
};

// 取消
const confirmCancel = (): void => {
	resetForm();
};

// 编辑
const editClick = (value: CreateTagDto): void => {
	Object.assign(formData, value);
	isEdit.value = true;
};

// 删除标签
const deleteClick = (value: CreateTagDto): void => {
	useConfirm('删除标签', 'warning', async () => {
		try {
			const { data, msg } = await deleteTags(value.id!);

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg,
			});

			if (data) {
				// 如果当前页只有一条数据且不是第一页，则回到上一页
				if (tableData.value.length === 1 && pageNumber.value > 1) {
					pageNumber.value -= 1;
				}
				queryTag(searchTag.value, pageNumber.value);
			}
		} catch (error) {
			ElMessage.error('删除失败，请重试');
		}
	});
};

// 分页查询
const handleCurrentChange = (val: number): void => {
	pageNumber.value = val;
	queryTag(searchTag.value, val);
};

// 每页条数改变
const handleSizeChange = (val: number): void => {
	pageSize.value = val;
	pageNumber.value = 1;
	queryTag(searchTag.value, 1);
};

// 使用防抖优化搜索
let searchTimeout: NodeJS.Timeout;
watch(searchTag, (newValue) => {
	clearTimeout(searchTimeout);
	searchTimeout = setTimeout(() => {
		pageNumber.value = 1;
		queryTag(newValue, 1);
	}, 300);
});
</script>

<template>
	<AdminFormMain title="新增标签">
		<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="createTagRules" class="!w-full">
			<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="name" label="名称：">
				<ElInput v-model="formData.name" placeholder="请输入标签" clearable />
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="icon" label="图标：">
				<ElInput v-model="formData.icon" placeholder="请输入图标" clearable>
					<template #prefix>
						<Icon class="cursor-pointer text-[20px]" :icon="formData.icon || 'mdi:emoticon-kiss-outline'" />
					</template>
					<template #suffix>
						<ElPopover content="参考 https://iconify.design/" placement="right">
							<template #reference>
								<Icon class="cursor-pointer text-[20px]" icon="ri:question-line" />
							</template>
						</ElPopover>
					</template>
				</ElInput>
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="url" label="链接：">
				<ElInput v-model="formData.url" placeholder="请输入链接" clearable />
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="type" label="类型：">
				<ElSelect v-model="formData.type" placeholder="请选择" class="!w-full" clearable>
					<ElOption label="博客" value="BLOG" />
					<ElOption label="个人" value="PERSON" />
				</ElSelect>
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full sm:pr-4">
				<ElButton v-if="!isEdit" :disabled="isIDisabled || loading" :loading="loading" type="primary"
					@click="createTag(ruleFormRef!)">
					新增
				</ElButton>
				<ElButton v-if="isEdit" :disabled="isIDisabled || loading" :loading="loading" type="primary"
					@click="updateTag(ruleFormRef!)">
					修改
				</ElButton>
				<ElButton v-if="isEdit" type="" plain @click="confirmCancel">取消</ElButton>
			</ElFormItem>
		</ElForm>

		<TableHeight>
			<template #default="{ height }">
				<ElTable v-loading="loading" :data="tableData" stripe :height="height" class="w-full !text-[16px]">
					<ElTableColumn fixed prop="id" label="ID" />
					<ElTableColumn prop="name" label="名称" />
					<ElTableColumn prop="icon" label="Icon">
						<template #default="scope">
							<Icon class="cursor-pointer text-[24px]" :icon="scope.row.icon" />
						</template>
					</ElTableColumn>
					<ElTableColumn prop="url" label="链接" width="1000">
						<template #default="scope">
							<el-link underline :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
						</template>
					</ElTableColumn>
					<ElTableColumn prop="type" label="类型">
						<template #default="scope">
							<span>{{ TagType[scope.row.type as keyof typeof TagType] }}</span>
						</template>
					</ElTableColumn>
					<ElTableColumn label="操作">
						<template #default="scope">
							<ElButton link type="primary" size="small" class="!text-[16px]"
								@click="editClick(scope.row)">
								编辑
							</ElButton>
							<ElButton link type="danger" class="!text-[16px]" size="small"
								@click="deleteClick(scope.row)">
								删除
							</ElButton>
						</template>
					</ElTableColumn>
				</ElTable>
			</template>
		</TableHeight>
		<div class="mt-2 flex w-full justify-end">
			<ElPagination background layout="total, sizes, prev, pager, next" :total="total" :page-size="pageSize"
				:current-page="pageNumber" :page-sizes="[10, 20, 50, 100]" @current-change="handleCurrentChange"
				@size-change="handleSizeChange" />
		</div>
	</AdminFormMain>
</template>

<style lang="postcss" scoped>
:deep(.el-form-item__content) {
	@apply flex w-full justify-end;
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
</style>
