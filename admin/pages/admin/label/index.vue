<script lang="ts" setup>
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import { ElFormItem, ElPopover, type FormInstance, type FormRules } from 'element-plus';

enum TagType {
	BLOG = '博客',
	PERSON = '个人'
}

const ruleFormRef = templateRef('ruleFormRef');
const formRef = templateRef<HTMLDivElement>('formRef');
const footerRef = templateRef<HTMLDivElement>('footerRef');
const formData = reactive<CreateTagDto>({
	name: '',
	icon: '',
	url: '',
	type: 'BLOG'
})
const tableData = ref<CreateTagDto[]>([])
const tableHeight = ref<number>(0)
const total = ref<number>(0)
const searchTag = ref<string>('')
const isEdit = ref<boolean>(false)

const rulesText = (value: string): boolean => {
	return /^[a-z0-9]+:[a-z0-9-_]+$/i.test(value)
}

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
			trigger: 'blur'
		}
	],
	url: [{ required: true, message: '请输入链接地址', trigger: 'blur' }],
	type: [{ required: true, message: '请选择类型', trigger: 'blur' }]
})

const isIDisabled = computed(() => {
	return !formData.name || !formData.icon || !formData.url || !formData.type
})

// 查询全部标签
const queryTag = async (name: string, n: number) => {
	const { records, total: t } = await queryTagAll(name, n)

	tableData.value = records
	total.value = t
}

// 新增标签
const createTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async valid => {
		if (valid) {
			const { data, msg } = await createTags(formData)

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg
			})
			queryTagAll('', 1)
		}
	})
}

// 修改标签
const updateTag = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async valid => {
		if (valid) {
			const { data, msg } = await updateTags(formData)

			ElMessage({
				type: data ? 'success' : 'error',
				message: msg
			})

			for (const item of tableData.value) {
				if (item.id === formData.id) {
					Object.assign(item, formData)
					break
				}
			}
		}
	})
}

// 编辑
const editClick = (value: CreateTagDto): void => {
	Object.assign(formData, value)
	isEdit.value = true
}

// 分页查询
const handleCurrentChange = (val: number): void => {
	queryTag(searchTag.value, val)
}

watch(searchTag, async () => {
	queryTag(searchTag.value, 1)
})

onMounted(async () => {
	await queryTag(searchTag.value, 1)

	nextTick(() => {
		tableHeight.value = formRef.value?.offsetHeight || 0
	})
})
</script>

<template>
	<div class="w-full h-full">
		<div ref="formRef" class="w-full">
			<h3 class="font-bold mb-2">新增标签</h3>
			<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="createTagRules" class="!w-full">
				<ElFormItem class="!w-full sm:!w-[50%] !mx-0 sm:odd:pr-4" prop="name" label="名称：">
					<ElInput v-model="formData.name" placeholder="请输入标签" clearable />
				</ElFormItem>
				<ElFormItem class="!w-full sm:!w-[50%] !mx-0 sm:odd:pr-4" prop="icon" label="图标：">
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
				<ElFormItem class="!w-full sm:!w-[50%] !mx-0 sm:odd:pr-4" prop="url" label="链接：">
					<ElInput v-model="formData.url" placeholder="请输入链接" clearable />
				</ElFormItem>
				<ElFormItem class="!w-full sm:!w-[50%] !mx-0 sm:odd:pr-4" prop="type" label="类型：">
					<ElSelect v-model="formData.type" placeholder="请选择" class="!w-full" clearable>
						<ElOption label="博客" value="BLOG" />
						<ElOption label="个人" value="PERSON" />
					</ElSelect>
				</ElFormItem>
				<ElFormItem class="!w-full !mx-0 sm:pr-4">
					<ElButton v-if="!isEdit" :disabled="isIDisabled" @click="createTag(ruleFormRef!)" type="primary">新增
					</ElButton>
					<ElButton v-if="isEdit" :disabled="isIDisabled" type="primary" @click="updateTag(ruleFormRef!)">修改
					</ElButton>
					<ElButton v-if="isEdit" type="" plain @click="isEdit = false">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</div>
		<div class="w-full" :style="{ height: `calc(100% - ${tableHeight}px)` }">
			<div class="font-bold mb-2 w-full flex justify-between items-center">
				<h3>标签列表</h3>
				<ElInput v-model="searchTag" placeholder="请输入名称" clearable class="!w-[200px]" />
			</div>
			<ElTable :data="tableData" show-overflow-tooltip class="w-full !text-[16px] !border-none"
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
						<ElButton link type="danger" class="!text-[16px]" size="small">删除</ElButton>
					</template>
				</ElTableColumn>
			</ElTable>
			<div ref="footerRef" class="hidden sm:flex h-[32px] w-full justify-end">
				<ElPagination background layout="prev, pager, next" :total="total" :page-size="10"
					@current-change="handleCurrentChange" />
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-form-item__content) {
	@apply w-full flex justify-end
}

:deep(.el-form-item__label) {
	@apply text-[16px] pr-0
}

:deep(.el-input__wrapper) {
	@apply text-[14px] h-[34px]
}

:deep(.el-select__wrapper) {
	@apply text-[14px] h-[34px]
}

:deep(.el-table__inner-wrapper::before) {
	@apply hidden
}
</style>
