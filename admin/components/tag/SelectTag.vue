<script lang="ts" setup>
interface TagsOptions {
	value: number;
	label: string;
}

const { tags = [] } = defineProps<{
	tags: number[];
}>();

const emit = defineEmits<{
	(e: 'tagChange', tagChange: number[]): void;
}>();

const values = ref(tags);
// 分类型查询标签
const { data: allTags } = await useAsyncData('alltags', () => {
	return queryTagByType('PERSON');
});
const tagsOptions = ref<TagsOptions[]>(
	allTags.value?.data?.map((item: any) => ({ value: item.id, label: item.name })) || [],
);

watch(values, (newVal) => {
	emit('tagChange', newVal);
});
</script>

<template>
	<el-select v-model="values" multiple placeholder="请选择标签">
		<el-option v-for="item in tagsOptions" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<style lang="postcss" scoped></style>
