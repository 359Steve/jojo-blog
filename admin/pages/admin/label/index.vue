<script lang="ts" setup>
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import { ElFormItem, ElPopover, type FormInstance, type FormRules } from 'element-plus';

enum TagType {
	BLOG = '博客',
	PERSON = '个人',
}

const ruleFormRef = templateRef('ruleFormRef');
const formRef = templateRef<HTMLDivElement>('formRef');
const footerRef = templateRef<HTMLDivElement>('footerRef');
const formData = reactive<CreateTagDto>({
	name: '',
	icon: '',
	url: '',
	type: 'BLOG',
});

const { data } = await useAsyncData('tags', () => queryTagAll());
const tableData = ref<CreateTagDto[]>(data.value?.records || []);
const tableRef = templateRef('tableRef');
const tableHeight = ref<number>(0);
const total = ref<number>(data.value?.total || 0);
const pageNumber = ref<number>(1);
const searchTag = ref<string>('');
const isEdit = ref<boolean>(false);

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

// 查询全部标签
const queryTag = async (name: string, n: number) => {
	const { records, total: t } = await queryTagAll(name, n);

	tableData.value = records;
	total.value = t;
};

// 新增标签
const createTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			const { data, msg } = await createTags(formData);

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg,
			});

			queryTag('', pageNumber.value);
		}
	});
};

// 修改标签
const updateTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			const { data, msg } = await updateTags(formData);

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg,
			});

			for (const item of tableData.value) {
				if (item.id === formData.id) {
					Object.assign(item, formData);
					break;
				}
			}
		}
	});
};

// 编辑
const editClick = (value: CreateTagDto): void => {
	Object.assign(formData, value);
	isEdit.value = true;
};

// 删除标签
const deleteClick = (value: CreateTagDto): void => {
	useConfirm('删除标签', 'warning', async () => {
		const { data, msg } = await deleteTags(value.id!);

		ElMessage({
			type: data ? 'success' : 'error',
			message: msg,
		});

		queryTag('', pageNumber.value);
	});
};

// 分页查询
const handleCurrentChange = (val: number): void => {
	pageNumber.value = val;
	queryTag(searchTag.value, val);
};

watch(searchTag, async () => {
	queryTag(searchTag.value, 1);
});

onMounted(() => {
	nextTick(() => {
		tableHeight.value = formRef.value?.offsetHeight || 0;

		// 监听表格滚动
		if (tableRef.value && tableRef.value.$el) {
			const el = tableRef.value?.$el.querySelector('.el-scrollbar__wrap');
			const { x, y } = useScroll(el);

			watch([x, y], () => {
				console.log('滚动了');
			});
		}
	});
});
</script>

<template>
	<div class="h-full w-full">
		<div ref="formRef" class="w-full">
			<h3 class="mb-2 font-bold">新增标签</h3>
			<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="createTagRules" class="!w-full">
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="name" label="名称：">
					<ElInput v-model="formData.name" placeholder="请输入标签" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="icon" label="图标：">
					<ElInput v-model="formData.icon" placeholder="请输入图标" clearable>
						<template #prefix>
							<Icon class="cursor-pointer text-[20px]"
								:icon="formData.icon || 'mdi:emoticon-kiss-outline'" />
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
					<ElButton v-if="!isEdit" :disabled="isIDisabled" type="primary" @click="createTag(ruleFormRef!)">
						新增
					</ElButton>
					<ElButton v-if="isEdit" :disabled="isIDisabled" type="primary" @click="updateTag(ruleFormRef!)">
						修改
					</ElButton>
					<ElButton v-if="isEdit" type="" plain @click="isEdit = false">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</div>
		<div class="w-full" :style="{ height: `calc(100% - ${tableHeight}px)` }">
			<div class="mb-2 flex w-full items-center justify-between font-bold">
				<h3>标签列表</h3>
				<ElInput v-model="searchTag" placeholder="请输入名称" clearable class="!w-[200px]" />
			</div>
			<ElTable ref="tableRef" :data="tableData" show-overflow-tooltip class="w-full !border-none !text-[16px]"
				:class="['!h-[calc(100%-38px)] sm:!h-[calc(100%-70px)]']">
				<ElTableColumn prop="name" label="名称" width="200" />
				<ElTableColumn prop="icon" label="Icon" width="200">
					<template #default="scope">
						<Icon class="cursor-pointer text-[24px]" :icon="scope.row.icon" />
					</template>
				</ElTableColumn>
				<ElTableColumn prop="url" label="链接" width="400">
					<template #default="scope">
						<el-link underline :href="scope.row.url" target="_blank">{{ scope.row.url }}</el-link>
					</template>
				</ElTableColumn>
				<ElTableColumn prop="type" label="类型" width="200">
					<template #default="scope">
						<span>{{ TagType[scope.row.type as keyof typeof TagType] }}</span>
					</template>
				</ElTableColumn>
				<ElTableColumn fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<ElButton link type="primary" size="small" class="!text-[16px]" @click="editClick(scope.row)">
							编辑
						</ElButton>
						<ElButton link type="danger" class="!text-[16px]" size="small" @click="deleteClick(scope.row)">
							删除
						</ElButton>
					</template>
				</ElTableColumn>
			</ElTable>
			<div ref="footerRef" class="hidden h-[32px] w-full justify-end sm:flex">
				<ElPagination background layout="prev, pager, next" :total="total" :page-size="10"
					@current-change="handleCurrentChange" />
			</div>
		</div>
	</div>
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
