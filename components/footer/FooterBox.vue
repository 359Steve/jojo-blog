<script lang="ts" setup>
const { userInfo } = storeToRefs(useBlogUserInfo());
const nowYear = computed(() => new Date().getFullYear());
</script>

<template>
	<div class="mt-8 grid w-full grid-cols-1 gap-2 py-2 sm:grid-cols-2">
		<div class="col-span-1 flex items-center justify-center gap-2 sm:col-span-2">
			<span class="text-xs">Copyright © {{ nowYear }} {{ userInfo?.pet_name }}</span>
			<a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
				class="mr-4 hidden items-center gap-2 text-xs sm:flex">
				蜀ICP备2025171383号
			</a>
		</div>
		<div class="flex items-center justify-center sm:hidden">
			<a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer"
				class="flex items-center gap-2 text-xs">
				蜀ICP备2025171383号
			</a>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
