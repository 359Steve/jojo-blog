<script lang="ts" setup>
const bool = ref(false);

const handleSearch = (): void => {
	bool.value = !bool.value;
};
</script>

<template>
	<div class="flex h-[48px] w-[40px] cursor-pointer items-center justify-center hover:bg-[#f1f1f1]"
		@click="handleSearch">
		<Icon icon="ri:search-line" width="20" height="20"></Icon>
	</div>
	<SearchModal v-model:show="bool" />
</template>

<style lang="scss" scoped></style>
