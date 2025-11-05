<script lang="ts" setup>
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';

const { data } = await useAsyncData('groupTimeRanges', () => queryGroupTimeRanges());
const selectData = ref<{ id: number; time_range: string }[]>(data.value?.data || []);
const groupId = ref<number>();
const formData = reactive<CreateRecordDetailDto>({
	group_id: groupId.value!,
	title: '',
	summary: '',
	time_range: '',
	image_url: '',
	image_alt: '',
});
const ruleFormRef = templateRef('ruleFormRef');
const upload = templateRef('upload');
const imageFile = ref<FormData | null>(new FormData());
const updateUserRules = reactive<FormRules>({
	group_id: [
		{
			required: true,
			message: '请选择汇总阶段',
			trigger: 'blur',
		},
	],
	image_url: [
		{
			required: true,
			message: '请上传图片',
			trigger: 'blur',
		},
	],
	title: [
		{
			required: true,
			message: '请输入标题',
			trigger: 'blur',
		},
	],
	summary: [
		{
			required: true,
			message: '请输入详情',
			trigger: 'blur',
		},
	],
	time_range: [
		{
			required: true,
			message: '请选择时间范围',
			trigger: 'blur',
		},
	],
	image_alt: [
		{
			required: true,
			message: '请输入图片描述',
			trigger: 'blur',
		},
	],
});
const isEdit = ref<boolean>(false);

// 移除当前图片
const handleRemove = () => {
	if (isEdit.value) {
		// 编辑模式下确认删除
		useConfirm('确定要移除当前图片吗？', 'warning', () => {
			formData.image_url = '';
			imageFile.value = null;
			upload.value?.clearFiles();
			ElMessage.success('图片已移除，保存时将不包含图片');
		});
	} else {
		// 新增模式直接删除
		formData.image_url = '';
		imageFile.value = null;
		upload.value?.clearFiles();
	}
};

// 上传成功
const handleImageSuccess = (uploadFile: UploadFile, _uploadFiles: UploadFiles) => {
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

	// 显示预览图片
	formData.image_url = URL.createObjectURL(uploadFile.raw);

	// 准备上传的 FormData
	imageFile.value = new FormData();
	imageFile.value.append('file', uploadFile.raw);

	ElMessage.success('图片选择成功');
};

// 格式化日期
const handelTiemchange = (value: string) => {
	const date = new Date(value);
	const year = date.getFullYear();
	formData.time_range = year.toString();
};

// 保存
const saveArticle = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			try {
				// 如果有新的图片文件需要上传
				if (imageFile.value && imageFile.value.has('file')) {
					const { data, msg } = await uploadRecordDetailImage(imageFile.value);

					if (!data) {
						ElMessage({
							type: 'error',
							message: msg,
						});
						return;
					}

					formData.image_url = data.url;
				}

				// 处理时间范围
				if (typeof formData.time_range !== 'string' && formData.time_range) {
					formData.time_range = new Date(formData.time_range).getFullYear().toString();
				}

				let res;
				if (isEdit.value) {
					// 修改
					res = await updateRecordDetail(formData);
				} else {
					// 新增
					res = await createRecordDetail(formData);
				}

				ElMessage({
					type: res.data ? 'success' : 'error',
					message: res.msg,
				});

				if (res.data) {
					// 重置表单
					resetForm();
					// 刷新列表
					await refreshData();
				}
			} catch (error) {
				ElMessage.error('操作失败，请重试');
			}
		}
	});
};

// 重置表单
const resetForm = () => {
	isEdit.value = false;
	formData.id = undefined;
	formData.group_id = 0;
	formData.title = '';
	formData.summary = '';
	formData.time_range = '';
	formData.image_url = '';
	formData.image_alt = '';
	groupId.value = undefined;
	imageFile.value = null;
	upload.value?.clearFiles();
	ruleFormRef.value?.resetFields();
};

// 刷新数据
const refreshData = async () => {
	// 这里可以添加刷新列表的逻辑
	console.log('数据已保存，可以在这里刷新列表');
};

// 取消编辑
const handleCancel = () => {
	resetForm();
};

// 编辑记录详情
const handleEdit = (row: CreateRecordDetailDto) => {
	isEdit.value = true;
	// 复制数据到表单
	Object.assign(formData, { ...row });
	groupId.value = row.group_id;

	if (row.image_url) {
		imageFile.value = null;
	}
};
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<div class="w-full">
			<h3 class="mb-2 font-bold">文章管理</h3>
			<ElForm ref="ruleFormRef" :model="formData" :rules="updateUserRules" :inline="true" class="!w-full"
				label-width="auto">
				<ElFormItem prop="image_url" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="照片：">
					<ElUpload ref="upload" class="relative" action="#" list-type="picture-card"
						:on-change="handleImageSuccess" :auto-upload="false" :show-file-list="false" :limit="1"
						accept="image/jpeg,image/jpg,image/png,image/gif,image/webp">
						<!-- 上传后显示图片 -->
						<template v-if="formData.image_url">
							<div class="group absolute h-full w-full" @click.stop>
								<ElImage :src="formData.image_url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
									:preview-src-list="[formData.image_url]" show-progress fit="cover" />
								<Icon
									class="absolute right-1 top-1 cursor-pointer text-[20px] text-admin-tag-active-text transition sm:opacity-0 sm:group-hover:text-admin-tag-active-text sm:group-hover:opacity-100"
									icon="mdi:close" @click="handleRemove" />
							</div>
						</template>
						<!-- 上传前显示加号 -->
						<template v-else>
							<Icon class="text-[40px] text-gray-400" icon="mdi:add" />
						</template>
					</ElUpload>
					<div v-if="isEdit && formData.image_url" class="mt-2 text-sm text-gray-500">
						编辑模式：保持原图片或选择新图片替换
					</div>
				</ElFormItem>
				<ElFormItem prop="summary" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="详情：">
					<ElInput v-model="formData.summary" type="textarea" :rows="6" placeholder="请输入详情" />
				</ElFormItem>
				<ElFormItem prop="image_alt" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="图片描述：">
					<ElInput v-model="formData.image_alt" placeholder="请输入图片描述" />
				</ElFormItem>
				<ElFormItem prop="time_range" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="年份：">
					<ElDatePicker v-model="formData.time_range" type="year" placeholder="请选择年份"
						@change="handelTiemchange" />
				</ElFormItem>
				<ElFormItem prop="title" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="标题：">
					<ElInput v-model="formData.title" placeholder="请输入标题" />
				</ElFormItem>
				<ElFormItem prop="group_id" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" label="汇总：">
					<ElSelect v-model="groupId" placeholder="请选择汇总" @change="(event) => (formData.group_id = event)">
						<ElOption v-for="item in selectData" :key="item.id" :label="item.time_range" :value="item.id" />
					</ElSelect>
				</ElFormItem>
				<ElFormItem class="button-end !mx-0 !w-full sm:pr-4">
					<ElButton type="primary" @click="saveArticle(ruleFormRef!)">
						{{ isEdit ? '修改' : '新增' }}
					</ElButton>
					<ElButton v-if="isEdit" plain @click="handleCancel">取消</ElButton>
				</ElFormItem>
			</ElForm>
		</div>

		<div class="flex min-h-0 w-full flex-1 flex-col">
			<!-- 文章列表待实现 -->
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-select) {
	@apply w-full;
}

:deep(.el-form-item__label) {
	@apply pr-0 text-[16px];
}

:deep(.el-input__wrapper) {
	@apply h-[34px] text-[14px];
}

:deep(.el-select__wrapper) {
	@apply min-h-[34px] w-full text-[14px];
}

:deep(.el-upload-dragger) {
	@apply h-[200px] w-[200px];
}

:deep(.save .el-form-item__content) {
	@apply flex justify-end;
}

:deep(.el-image) {
	@apply h-full w-full object-cover;
}

:deep(.el-form-item__label-wrap) {
	@apply !h-full;
}

:deep(.el-date-editor) {
	@apply w-full;
}

:deep(.button-end .el-form-item__content) {
	@apply flex w-full justify-end;
}
</style>
