<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import { ElFormItem, type FormInstance, type FormRules } from 'element-plus';

const formData = reactive<CreateBlogDto>({
	title: '',
	subtitle: '',
	tags: [],
	content: '',
});

const ruleFormRef = templateRef('ruleFormRef');

const createBlogRules = reactive<FormRules>({
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	subtitle: [{ required: true, message: '请输入简介', trigger: 'blur' }],
	tags: [{ type: 'array', required: true, message: '请选择标签', trigger: 'change' }],
	content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
});

// 保存博客
const saveBlog = async (formEl: FormInstance | undefined) => {
	formEl?.validate(async (valid) => {
		if (valid) {
			const { data, msg } = await createBlog(formData);

			ElMessage({
				message: msg,
				type: data ? 'success' : 'error',
			});
		}
	});
};

// 重置表单
const resetForm = () => {
	formData.title = '';
	formData.subtitle = '';
	formData.tags = [];
	formData.content = '';
	ruleFormRef.value?.resetFields();
};
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<h3 class="mb-2 font-bold">新增博客</h3>
		<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="createBlogRules" class="!w-full">
			<div class="grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4">
				<ElFormItem prop="title" class="!mx-0 !w-full" label="标题：">
					<ElInput v-model="formData.title" placeholder="请输入标题" clearable />
				</ElFormItem>
				<ElFormItem prop="tags" class="!mx-0 !w-full" label="标签：">
					<SelectTag :tags="formData.tags" type="BLOG" @tag-change="formData.tags = $event" />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full" prop="subtitle" label="简介：">
					<ElInput v-model="formData.subtitle" placeholder="请输入简介" type="textarea" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full">
					<ElButton type="primary" @click="saveBlog(ruleFormRef!)">保存</ElButton>
					<ElButton type="" plain @click="resetForm">重置</ElButton>
				</ElFormItem>
			</div>
			<div class="w-full flex-1">
				<ElFormItem label="内容：" class="!mx-0 !mb-0 h-full w-full" prop="content">
					<ClientOnly>
						<MdEditor v-model="formData.content" :theme="useJojoColorMode().darkMode.preference" />
					</ClientOnly>
				</ElFormItem>
			</div>
		</ElForm>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-form) {
	@apply flex flex-1 flex-col;
}

:deep(.el-form-item__content) {
	@apply flex h-full w-full justify-end;
}

:deep(.el-form-item .el-form-item__content) {
	@apply h-full;
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

:deep(.md-editor) {
	@apply h-full w-full;
}

:deep(.md-editor-content) {
	@apply h-full;
}

:deep(.md-editor-content-wrapper) {
	@apply h-full;
}

:deep(.md-editor-input-wrapper) {
	@apply h-full;
}

:deep(.md-editor-input) {
	@apply h-full;
}
</style>
