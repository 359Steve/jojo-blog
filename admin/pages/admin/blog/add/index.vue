<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';

const formData = reactive<CreateBlogDto & { tags: number[] }>({
	title: '',
	subtitle: '',
	tags: [],
	content: '',
});
</script>

<template>
	<div class="h-full w-full">
		<div class="w-full">
			<h3 class="mb-2 font-bold">新增博客</h3>
			<ElForm ref="ruleFormRef" :inline="true" :model="formData"
				class="grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4">
				<ElFormItem class="!mx-0 !w-full" prop="name" label="标题：">
					<ElInput v-model="formData.title" placeholder="请输入标题" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full" prop="url" label="标签：">
					<SelectTag :tags="formData.tags" type="BLOG" @tag-change="formData.tags = $event" />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full" prop="icon" label="简介：">
					<ElInput v-model="formData.subtitle" placeholder="请输入简介" type="textarea" clearable />
				</ElFormItem>
				<ElFormItem class="!mx-0 !w-full">
					<ElButton type="primary" @click="console.log(formData)">保存</ElButton>
					<ElButton type="" plain @click="console.log(formData)">重置</ElButton>
				</ElFormItem>
				<ElFormItem label="内容：" class="col-span-1 !mx-0 sm:col-span-2" prop="describe">
					<ClientOnly>
						<MdEditor v-model="formData.content" :theme="useJojoColorMode().darkMode.preference" />
					</ClientOnly>
				</ElFormItem>
			</ElForm>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-form-item) {
	@apply h-fit;
}

:deep(.el-form-item__content) {
	@apply flex h-fit w-full justify-end;
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
