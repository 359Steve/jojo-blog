<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import { ElFormItem, type FormInstance, type FormRules, type UploadFile, type UploadFiles } from 'element-plus';

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
const frontImage = ref<FormData | null>(null);
const upload = templateRef('upload');
// 初始化表单数据
const initFormData = () => {
	if (currentBlog.value?.id) {
		return {
			...currentBlog.value,
			tags: currentBlog.value.tags.map((tag) => tag.tag_id),
		};
	}
	return {
		title: '',
		front_cover: '',
		subtitle: '',
		content: '',
		tags: [],
	};
};

const formData = reactive<CreateBlogDto>(initFormData());

const ruleFormRef = templateRef('ruleFormRef');
const isEdit = computed(() => !!currentBlog.value?.id);
const loading = ref(false);

// 计算封面按钮文本
const coverButtonText = computed(() => {
	if (isEdit.value) {
		return frontImage.value ? '重新选择封面' : '更换封面';
	}
	return formData.front_cover ? '重新选择' : '上传封面';
});

const createBlogRules = reactive<FormRules>({
	title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
	front_cover: [{ required: true, message: '请上传封面', trigger: 'blur' }],
	subtitle: [{ required: true, message: '请输入简介', trigger: 'blur' }],
	tags: [{ type: 'array', required: true, message: '请选择标签', trigger: 'change' }],
	content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
});

// 保存或更新博客
const saveBlog = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		ElMessage.error('表单验证失败');
		return;
	}

	formEl.validate(async (valid) => {
		if (!valid) {
			ElMessage.warning('请检查表单信息');
			return;
		}

		loading.value = true;
		try {
			// 如果有新的封面文件需要上传
			if (frontImage.value && frontImage.value.has('file')) {
				const coverUploadResult = await uploadBlogCover(frontImage.value);

				if (!coverUploadResult.data?.url) {
					ElMessage.error(coverUploadResult.msg || '封面上传失败，请重试');
					return;
				}

				formData.front_cover = coverUploadResult.data.url;
				ElMessage.success('封面上传成功');
			}

			// 验证必要字段 - 编辑模式下如果没有选择新文件，使用原有封面
			if (!formData.front_cover) {
				if (isEdit.value) {
					ElMessage.error('编辑时封面信息丢失，请重新选择封面');
				} else {
					ElMessage.error('请上传封面图片');
				}
				return;
			}

			let res = null;

			// 执行保存或更新操作
			if (isEdit.value) {
				res = await updateBlog(formData);
			} else {
				const { id, ...blogDataWithoutId } = formData;
				res = await createBlog(blogDataWithoutId);
			}

			// 处理响应结果
			if (res?.data) {
				ElMessage.success(res.msg || (isEdit.value ? '更新成功' : '创建成功'));

				// 成功后清理状态并跳转
				resetCurrentBlog();
				await navigateTo('/admin/blog/group');
			} else {
				ElMessage.error(res?.msg || (isEdit.value ? '更新失败' : '创建失败'));
			}
		} catch (error) {
			console.error('保存博客失败:', error);
			const errorMessage = error instanceof Error ? error.message : '操作失败，请重试';
			ElMessage.error(errorMessage);
		} finally {
			loading.value = false;
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

			// 检查文件大小
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

// 上传封面
const handleAvatarSuccess = (uploadFile: UploadFile, _uploadFiles: UploadFiles) => {
	// 验证文件类型
	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
	const maxSize = 5 * 1024 * 1024; // 5MB

	if (!uploadFile.raw) {
		ElMessage.error('文件上传失败');
		return;
	}

	// 验证文件类型
	if (!allowedTypes.includes(uploadFile.raw.type)) {
		ElMessage.error('只能上传 JPG、PNG、GIF、WebP 格式的图片');
		upload.value?.clearFiles();
		return;
	}

	// 验证文件大小
	if (uploadFile.raw.size > maxSize) {
		ElMessage.error('图片大小不能超过 5MB');
		upload.value?.clearFiles();
		return;
	}

	// 更新显示的文件名
	formData.front_cover = uploadFile.name || '';

	// 准备上传的 FormData
	frontImage.value = new FormData();
	frontImage.value.append('file', uploadFile.raw);

	ElMessage.success(`封面选择成功${isEdit.value ? '，保存时将替换原封面' : '，保存时将自动上传'}`);
};

// 返回新增
const backAdd = () => {
	// 清理当前博客状态
	resetCurrentBlog();

	// 重置表单验证状态
	ruleFormRef.value?.resetFields();

	// 清空表单数据
	Object.assign(formData, {
		title: '',
		front_cover: '',
		subtitle: '',
		content: '',
		tags: [],
	});

	// 清理上传状态
	frontImage.value = null;
	upload.value?.clearFiles();

	// 跳转到新增页面
	navigateTo('/admin/blog/add');
};

// 重置表单
const resetForm = () => {
	// 重置表单验证状态
	ruleFormRef.value?.resetFields();

	// 重置表单数据
	if (isEdit.value && currentBlog.value) {
		// 编辑模式恢复到原始博客数据
		Object.assign(formData, {
			...currentBlog.value,
			tags: currentBlog.value.tags.map((tag) => tag.tag_id),
		});
	} else {
		// 新增模式清空所有数据
		Object.assign(formData, {
			title: '',
			front_cover: '',
			subtitle: '',
			content: '',
			tags: [],
		});
	}

	// 清理上传相关状态
	frontImage.value = null;
	upload.value?.clearFiles();
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
				<ElFormItem label="封面：" prop="front_cover">
					<div class="flex w-full items-center gap-2">
						<ElUpload ref="upload" action="#" :auto-upload="false" :show-file-list="false" :limit="1"
							:disabled="loading" accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
							:on-change="handleAvatarSuccess">
							<template #trigger>
								<ElButton type="primary" :disabled="loading">
									{{ coverButtonText }}
								</ElButton>
							</template>
						</ElUpload>
						<div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[16px]">
							<span v-if="formData.front_cover" class="text-gray-700">
								{{ isEdit && !frontImage ? '当前封面: ' : '已选择: ' }}
								<span class="text-blue-600">{{ formData.front_cover }}</span>
							</span>
							<span v-else class="text-gray-500">请选择封面图片</span>
						</div>
						<div v-if="isEdit && !frontImage" class="whitespace-nowrap text-[16px] text-gray-400">
							不选择新文件将保持原封面
						</div>
					</div>
				</ElFormItem>
				<ElFormItem prop="title" class="!mx-0 !w-full" label="标题：">
					<ElInput v-model="formData.title" placeholder="请输入标题" clearable />
				</ElFormItem>
				<ElFormItem prop="tags" class="!mx-0 !w-full" label="标签：">
					<SelectTag :tags="formData.tags" type="BLOG" @tag-change="formData.tags = $event" />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full" prop="subtitle" label="简介：">
					<ElInput v-model="formData.subtitle" placeholder="请输入简介" type="textarea" clearable />
				</ElFormItem>
				<ElFormItem class="last col-span-1 !mx-0 !w-full sm:col-span-2">
					<ElButton v-if="isEdit" type="primary" plain @click="backAdd">新增</ElButton>
					<ElButton type="primary" :loading="loading" :disabled="loading" @click="saveBlog(ruleFormRef!)">
						{{ loading ? (isEdit ? '更新中...' : '保存中...') : isEdit ? '更新' : '保存' }}
					</ElButton>
					<ElButton type="" plain :disabled="loading" @click="resetForm">重置</ElButton>
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
	@apply flex h-full w-full;
}

:deep(.el-form-item .el-form-item__content) {
	@apply h-full;
}

:deep(.last .el-form-item__content) {
	@apply justify-end;
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
