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
	color: '#000000',
	url: '',
	type: 'BLOG',
});

const pageNumber = ref<number>(1);
const pageSize = ref<number>(10);
const searchTag = ref<string>('');
const debouncedSearch = useDebounce(searchTag, 300);
watch([debouncedSearch, pageSize], () => {
	pageNumber.value = 1;
});
const { data, refresh } = await useAsyncData(
	'tags',
	() =>
		queryTagAll({
			name: debouncedSearch.value,
			pageNumber: pageNumber.value,
			pageSize: pageSize.value,
		}),
	{
		watch: [pageNumber, debouncedSearch],
	},
);
const tableData = computed<CreateTagDto[]>(() => data.value?.data?.records || []);
const total = computed<number>(() => data.value?.data?.total || 0);
const isEdit = ref<boolean>(false);
const loading = ref<boolean>(false);

const rulesText = (value: string): boolean => {
	return /^[a-z0-9]+(?:[._-][a-z0-9]+)*:[a-z0-9]+(?:[._\-/][a-z0-9]+)*$/i.test(value);
};
const rulesColor = (value: string): boolean => {
	return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
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
				} else if (!rulesText(value)) {
					callback(new Error('图标名称格式不正确'));
				} else {
					iconChange(value).then((res) => {
						res ? callback() : callback(new Error('图标不存在'));
					});
				}
			},
			trigger: 'change',
		},
	],
	color: [
		{
			required: false,
			validator: (_rule: any, value: string, callback: any) => {
				if (!value) {
					callback();
				} else if (rulesColor(value)) {
					callback();
				} else {
					callback(new Error('颜色值格式不正确'));
				}
			},
			trigger: 'blur',
		},
	],
	url: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
	type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
});

// 重置表单
const resetForm = () => {
	formData.name = '';
	formData.icon = '';
	formData.color = '#000000';
	formData.url = '';
	formData.type = 'BLOG';
	delete formData.id;
	isEdit.value = false;
	ruleFormRef.value?.resetFields();
};

// 新增标签
const createTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				const { data } = await createTags(formData);

				if (data) {
					resetForm();
					refresh();
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
				const { data } = await updateTags(formData);

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
			const { data } = await deleteTags(value.id!);
			data && refresh();
		} finally {
			loading.value = false;
		}
	});
};

// 分页查询
const handleCurrentChange = (val: number): void => {
	pageNumber.value = val;
};

// 每页条数改变
const handleSizeChange = (val: number): void => {
	pageSize.value = val;
};

// 验证icon是否存在
const iconChange = async (icon: string) => {
	return await validateIconify(icon);
};
</script>

<template>
	<AdminFormMain title="新增标签">
		<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="createTagRules"
			class="grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4">
			<ElFormItem class="!mx-0 !w-full" prop="name" label="名称：">
				<ElInput v-model="formData.name" placeholder="请输入标签" clearable />
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full" prop="icon" label="图标：">
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
			<ElFormItem class="!mx-0 !w-full" prop="url" label="链接：">
				<ElInput v-model="formData.url" placeholder="请输入链接" clearable />
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full" prop="type" label="类型：">
				<ElSelect v-model="formData.type" placeholder="请选择" class="!w-full" clearable>
					<ElOption label="博客" value="BLOG" />
					<ElOption label="个人" value="PERSON" />
				</ElSelect>
			</ElFormItem>
			<ElFormItem class="!mx-0 !w-full" prop="color" label="颜色：">
				<ElInput v-model="formData.color" class="color" placeholder="请输入颜色值，如 #409eff" clearable>
					<template #prefix>
						<el-color-picker v-model="formData.color" class="!border-none" />
					</template>
				</ElInput>
			</ElFormItem>
			<ElFormItem class="save !mx-0">
				<ElButton v-if="!isEdit" :loading="loading" type="primary" @click="createTag(ruleFormRef!)">
					新增
				</ElButton>
				<ElButton v-if="isEdit" :loading="loading" type="primary" @click="updateTag(ruleFormRef!)">
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
							<Icon class="cursor-pointer text-[24px]" :icon="scope.row.icon"
								:style="{ color: scope.row.color }" />
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

		<AdminFormPagination :total="total" :page-number="pageNumber" :page-size="pageSize"
			@handle-current-change="handleCurrentChange" @handle-size-change="handleSizeChange" />
	</AdminFormMain>
</template>

<style lang="postcss" scoped>
:deep(.el-color-picker__trigger) {
	@apply !p-0;
}

:deep(.color .el-input__wrapper) {
	@apply pl-0;
}
</style>
