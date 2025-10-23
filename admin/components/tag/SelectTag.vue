<script lang="ts" setup>
interface TagsOptions {
	value: number;
	label: string;
}

const props = defineProps<{
	tags: number[];
	type: keyof typeof TagType;
}>();

const emit = defineEmits<{
	(e: 'tagChange', tagChange: number[]): void;
}>();

const values = ref(props.tags);
const { data: allTags } = await useAsyncData(
	`alltags-${props.type}`,
	() => {
		return queryTagByType(props.type);
	},
	{
		watch: [() => props.type],
	},
);
const tagsOptions = ref<TagsOptions[]>(
	allTags.value?.data?.map((item: any) => ({ value: item.id, label: item.name })) || [],
);

watchEffect(() => {
	values.value = props.tags;
});

watch(allTags, (newTags) => {
	tagsOptions.value = newTags?.data?.map((item: any) => ({ value: item.id, label: item.name })) || [];
});

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
