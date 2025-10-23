<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import { ElFormItem, type FormInstance, type FormRules } from 'element-plus';

definePageMeta({
	async validate(route) {
		if (!route.query.id) {
			return true;
		}

		try {
			const blog = await getBlogById(Number(route.query.id));
			if (blog) {
				useBlog().setCurrentBlog(blog.data);
				return true;
			} else {
				useBlog().resetCurrentBlog();
				return false;
			}
		} catch (error) {
			useBlog().resetCurrentBlog();
			return false;
		}
	},
});

const { resetCurrentBlog } = useBlog();
const { currentBlog } = storeToRefs(useBlog());
const formData = reactive<CreateBlogDto>(
	currentBlog.value?.id
		? {
			...currentBlog.value,
			tags: currentBlog.value.tags.map((tag) => tag.tag_id),
		}
		: {
			title: '',
			subtitle: '',
			content: '',
			tags: [],
		},
);

const ruleFormRef = templateRef('ruleFormRef');
const isEdit = computed(() => !!currentBlog.value?.id);
const loading = ref(false);

const createBlogRules = reactive<FormRules>({
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	subtitle: [{ required: true, message: '请输入简介', trigger: 'blur' }],
	tags: [{ type: 'array', required: true, message: '请选择标签', trigger: 'change' }],
	content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
});

// 保存或更新博客
const saveBlog = async (formEl: FormInstance | undefined) => {
	formEl?.validate(async (valid) => {
		if (valid) {
			loading.value = true;
			try {
				let res = null;
				if (isEdit.value) {
					res = await updateBlog(formData);
				} else {
					const { id, ...rest } = formData;
					res = await createBlog({
						...rest,
					});
				}

				if (res.data) {
					ElMessage({
						message: res.msg,
						type: res.data ? 'success' : 'error',
					});
				}

				if (res.data) {
					// 保存成功后返回博客管理页面
					await navigateTo('/admin/blog/group');
				}
			} catch (error) {
				ElMessage.error('保存失败，请重试');
			} finally {
				loading.value = false;
			}
		}
	});
};

// markdown编辑器图片上传
const mdEditorUpload = async (files: File[], callback: (urls: string[]) => void) => {
	try {
		// 验证文件类型 - 只允许图片格式
		const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
		const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

		const validFiles = files.filter((file, index) => {
			// 检查 MIME 类型
			const isValidMimeType = allowedTypes.includes(file.type);

			// 检查文件扩展名
			const fileName = file.name.toLowerCase();
			const fileExtension = fileName.split('.').pop() || '';
			const isValidExtension = allowedExtensions.includes(fileExtension);

			// 检查文件大小 (限制5MB)
			const maxSize = 5 * 1024 * 1024; // 5MB
			const isValidSize = file.size <= maxSize;

			if (!isValidMimeType || !isValidExtension) {
				ElMessage.warning(`第${index + 1}张不是有效图片`);
				return false;
			}

			if (!isValidSize) {
				ElMessage.warning(`第${index + 1}张超过5MB大小限制`);
				return false;
			}

			return true;
		});

		if (validFiles.length === 0) {
			ElMessage.error('没有有效的图片文件可上传');
			callback([]);
			return;
		}

		if (validFiles.length < files.length) {
			ElMessage.warning(`已过滤 ${files.length - validFiles.length} 张文件`);
		}

		const formData = new FormData();
		validFiles.forEach((file) => {
			formData.append('files', file);
		});

		const res = await mdUploadImage(formData);

		if (res.data) {
			ElMessage.success(`成功上传 ${validFiles.length} 张图片文件`);
			callback(res.data.urls);
		} else {
			throw new Error(res.msg || '上传失败');
		}
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : '图片上传失败，请重试';
		ElMessage.error(errorMessage);
		callback([]);
	}
};

// 返回新增
const backAdd = () => {
	resetCurrentBlog();
	ruleFormRef.value?.resetFields();
	navigateTo('/admin/blog/add');
};

// 重置表单
const resetForm = () => {
	ruleFormRef.value?.resetFields();
	formData.title = '';
	formData.subtitle = '';
	formData.content = '';
	formData.tags = [];
};

onBeforeUnmount(() => {
	resetCurrentBlog();
});
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<h3 class="mb-2 font-bold">{{ isEdit ? '编辑博客' : '新增博客' }}</h3>
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
					<ElButton v-if="isEdit" type="primary" plain @click="backAdd">新增</ElButton>
					<ElButton type="primary" @click="saveBlog(ruleFormRef!)">保存</ElButton>
					<ElButton type="" plain @click="resetForm">重置</ElButton>
				</ElFormItem>
			</div>
			<MdEditHeight>
				<template #default="{ height }">
					<ElFormItem label="内容：" class="!mx-0 !mb-0 h-full w-full" prop="content">
						<ClientOnly>
							<MdEditor v-model="formData.content" :theme="useJojoColorMode().darkMode.preference"
								:style="{ height: `${height}px` }" @on-upload-img="mdEditorUpload" />
						</ClientOnly>
					</ElFormItem>
				</template>
			</MdEditHeight>
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
</style>
