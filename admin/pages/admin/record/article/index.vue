<script lang="ts" setup>
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { FormInstance, FormRules, UploadFile, UploadUserFile } from 'element-plus';

const { data } = await useAsyncData('groupTimeRanges', () => queryGroupTimeRanges());
const selectData = computed<{ id: number; time_range: string }[]>(() => data.value?.data || []);

// 获取记录详情数据
const pageSize = ref<number>(10);
const pageNumber = ref<number>(1);
const loading = ref<boolean>(false);
watch(pageSize, () => {
	pageNumber.value = 1;
});
const { data: detailData, refresh } = await useAsyncData(
	'recordArticleDetails',
	() => queryRecordDetailAll(pageNumber.value, pageSize.value),
	{
		watch: [pageNumber],
	},
);
const total = computed<number>(() => detailData.value?.data?.total || 0);
const tableData = computed<GroupWithDetail<Omit<CreateRecordDetailDto, 'images'>>[]>(
	() => detailData.value?.data?.records || [],
);
const groupId = ref<number>();
const formData = reactive<CreateRecordDetailDto>({
	group_id: groupId.value!,
	title: '',
	summary: '',
	time_range: '',
	images: [],
	date_path: '',
	image_alt: '',
});
const ruleFormRef = useTemplateRef('ruleFormRef');
const upload = useTemplateRef('upload');
const imageFile = ref<FormData | null>(new FormData());
const fileList = ref<UploadUserFile[]>([]);

const validateImages = (_rule: any, _value: any, callback: (error?: Error) => void) => {
	if (fileList.value.length > 0) {
		callback();
		return;
	}
	callback(new Error('请上传照片'));
};
const updateUserRules = reactive<FormRules>({
	group_id: [
		{
			required: true,
			message: '请选择汇总阶段',
			trigger: 'blur',
		},
	],
	images: [
		{
			validator: validateImages,
			trigger: ['change', 'blur'],
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

const handleBeforeRemove = (uploadFile: UploadFile) => {
	const stem = getFileStem(uploadFile.name) || getFileStem(uploadFile.url);

	if (!stem) return true;

	fileList.value = fileList.value.filter((item) => {
		const itemStem = getFileStem(item.name) || getFileStem(item.url);
		return itemStem !== stem;
	});

	formData.images = formData.images.filter((url) => getFileStem(url) !== stem);

	imageFile.value = new FormData();
	fileList.value.forEach((item) => {
		if (item.raw) imageFile.value!.append('files', item.raw);
	});

	ruleFormRef.value?.validateField?.('images');

	return false;
};

// 上传成功
const handleImageSuccess = (uploadFile: UploadFile) => {
	// 验证文件类型
	const allowedTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/gif',
		'image/webp',
		'image/heic',
		'video/quicktime',
	];
	const maxSize = 10 * 1024 * 1024; // 10MB

	if (!uploadFile.raw) {
		ElMessage.error('文件上传失败');
		return;
	}

	// 验证文件类型
	if (!allowedTypes.includes(uploadFile.raw.type)) {
		ElMessage.error('只能上传 JPG、PNG、GIF、WebP、MOV 格式的图片');
		return;
	}

	// 验证文件大小
	if (uploadFile.raw.size > maxSize) {
		ElMessage.error('图片大小不能超过 10MB');
		return;
	}

	formData.images.push('');
	imageFile.value!.append('files', uploadFile.raw);
	ruleFormRef.value?.validateField?.('images');
};

// 保存
const saveArticle = async (formEl: FormInstance | undefined): Promise<void> => {
	const date_path = isEdit.value ? formData.date_path : getDatePath();
	formEl?.validate(async (valid) => {
		if (valid) {
			try {
				const hasNewFiles = imageFile.value && imageFile.value.has('files');
				!imageFile.value?.has('datePath') && imageFile.value?.append('datePath', date_path);

				if (hasNewFiles) {
					const { data } = await uploadRecordDetailImage(imageFile.value!);

					if (!data) {
						return;
					}

					formData.images = isEdit.value ? [...formData.images, ...data.urls] : data.urls;
					formData.date_path = date_path;
				}

				let res;
				if (isEdit.value) {
					// 修改
					res = await updateRecordDetail({
						...formData,
						images: formData.images.filter((url) => url !== ''),
					});
				} else {
					// 新增
					res = await createRecordDetail({
						...formData,
						images: formData.images.filter((url) => url !== ''),
					});
				}

				if (res.data) {
					// 重置表单
					resetForm();
					refresh();
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
	formData.images = [];
	formData.date_path = '';
	formData.image_alt = '';
	groupId.value = undefined;
	imageFile.value = new FormData();
	fileList.value = [];
	upload.value?.clearFiles();
	ruleFormRef.value?.resetFields();
};

// 分页处理
const handleSizeChange = (val: number) => {
	pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
	pageNumber.value = val;
};

// 编辑操作
const goEdit = (row: any) => {
	handleEdit(row);
};

// 删除操作
const handleDelete = async (id: number) => {
	useConfirm('删除记录详情', 'warning', async () => {
		const res = await deleteRecordDetail(id);
		if (res.data) {
			res.data && refresh();
			formData.id === id && resetForm();
		}
	});
};

// 格式化日期
const handleDateChange = (value: string) => {
	const newDate = new Date(value);
	formData.time_range = `${newDate.getFullYear().toString()}-${(newDate.getMonth() + 1).toString().padStart(2, '0')}-${newDate
		.getDate()
		.toString()
		.padStart(2, '0')}`;
};

// 取消编辑
const handleCancel = () => {
	resetForm();
};

// 编辑记录详情
const handleEdit = (row: GroupWithDetail<Omit<CreateRecordDetailDto, 'images'>>) => {
	const { group, ...rest } = row;
	isEdit.value = true;

	// 复制数据到表单
	Object.assign(formData, {
		...rest,
		images: row.images.map((item) => item.url),
	});
	groupId.value = row.group_id;

	// 重置上传相关状态
	imageFile.value = new FormData();

	if (row.images && row.images.length > 0) {
		fileList.value = row.images.map((imageUrl: RecordDetailImages, index: number) => {
			const fileName = getFileName(imageUrl.url);
			return {
				name: fileName,
				url: imageUrl.url,
				uid: Date.now() + index,
				status: 'success' as const,
				percentage: 100,
			} as UploadUserFile;
		});
	} else {
		fileList.value = [];
	}
};
</script>

<template>
	<AdminFormMain title="文章管理">
		<ElForm ref="ruleFormRef" :inline="true" :model="formData" :rules="updateUserRules"
			class="grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4" label-width="100px">
			<ElFormItem prop="images" class="choose-pic !mx-0 !w-full" label="照片：">
				<ElUpload ref="upload" v-model:file-list="fileList" :auto-upload="false" :multiple="true"
					class="relative w-full" action="#" :on-change="handleImageSuccess" :on-remove="handleRemove"
					list-type="picture">
					<el-button type="primary">上传照片</el-button>
				</ElUpload>
			</ElFormItem>
			<ElFormItem prop="summary" class="!mx-0 !w-full" label="详情：">
				<ElInput v-model="formData.summary" type="textarea" :rows="6" placeholder="请输入详情" />
			</ElFormItem>
			<ElFormItem prop="image_alt" class="!mx-0 !w-full" label="图片描述：">
				<ElInput v-model="formData.image_alt" placeholder="请输入图片描述" />
			</ElFormItem>
			<ElFormItem prop="time_range" class="!mx-0 !w-full" label="年份：">
				<ElDatePicker v-model="formData.time_range" placeholder="请选择年份" @change="handleDateChange" />
			</ElFormItem>
			<ElFormItem prop="title" class="!mx-0 !w-full" label="标题：">
				<ElInput v-model="formData.title" placeholder="请输入标题" />
			</ElFormItem>
			<ElFormItem prop="group_id" class="!mx-0 !w-full" label="汇总：">
				<ElSelect v-model="groupId" placeholder="请选择汇总" @change="(event) => (formData.group_id = event)">
					<ElOption v-for="item in selectData" :key="item.id" :label="item.time_range" :value="item.id" />
				</ElSelect>
			</ElFormItem>
			<ElFormItem class="save col-span-1 !mx-0 !w-full sm:col-span-2">
				<ElButton type="primary" @click="saveArticle(ruleFormRef!)">
					{{ isEdit ? '修改' : '新增' }}
				</ElButton>
				<ElButton v-if="isEdit" plain @click="handleCancel">取消</ElButton>
			</ElFormItem>
		</ElForm>

		<TableHeight>
			<template #default="{ height }">
				<ElTable v-loading="loading" :data="tableData" :height="height" stripe class="!w-full !text-[16px]">
					<ElTableColumn fixed prop="id" label="ID" width="80" />
					<ElTableColumn prop="title" label="标题" width="150" show-overflow-tooltip />
					<ElTableColumn prop="time_range" label="日期" width="130" />
					<ElTableColumn label="分组" width="120">
						<template #default="{ row }">
							<template v-if="row.group">
								{{ row.group.time_range }}
							</template>
							<template v-else>—</template>
						</template>
					</ElTableColumn>
					<ElTableColumn prop="summary" label="详情" show-overflow-tooltip />
					<ElTableColumn label="图片" width="100">
						<template #default="{ row }">
							{{ row.images ? row.images.length : 0 }}
						</template>
					</ElTableColumn>
					<ElTableColumn prop="image_alt" label="图片描述" width="120" show-overflow-tooltip />
					<ElTableColumn label="操作" width="160" fixed="right">
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

:deep(.el-upload-list) {
	@apply max-h-[180px] w-full overflow-y-auto;
}

:deep(.el-upload-list__item-thumbnail) {
	@apply h-12 w-12;
}

:deep(.choose-pic .el-form-item__content) {
	@apply flex items-start;
}
</style>
