<script lang="ts" setup>
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

const formData = reactive<CreateGroupDto>({
	time_range: '',
	title: '',
	role: '',
	summary: '',
});

const saveGroup = async () => {
	const res = await createGroup(formData);
	console.log('创建分组结果：', res);
};

const handleDateChange = (value: string) => {
	const date = new Date(value);
	const year = date.getFullYear();
	formData.time_range = year.toString();
};
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<div class="w-full">
			<h3 class="mb-2 font-bold">分组管理</h3>
			<ElForm ref="ruleFormRef" :model="formData" :inline="true" class="!w-full">
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="name" label="日期：">
					<ElDatePicker v-model="formData.time_range" type="year" placeholder="请选择年份"
						@change="handleDateChange" />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="icon" label="标题：">
					<ElInput v-model="formData.title" placeholder="请输入标题" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="url" label="简介：">
					<ElInput v-model="formData.summary" placeholder="请输入简介" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="type" label="描述：">
					<ElInput v-model="formData.role" placeholder="请输入描述" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full sm:pr-4">
					<ElButton type="primary" @click="saveGroup">新增</ElButton>
					<ElButton type="primary">修改</ElButton>
					<ElButton plain>取消</ElButton>
				</ElFormItem>
			</ElForm>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-form-item__content) {
	@apply flex w-full justify-end;
}

:deep(.el-date-editor) {
	@apply !w-full;
}
</style>
