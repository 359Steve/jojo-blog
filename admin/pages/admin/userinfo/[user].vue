<script lang="ts" setup>
definePageMeta({
	validate: async (route) => {
		console.log('用户数据', route.params)
		return true
	}
})
</script>

<template>
	<div>个人信息</div>
</template>

<style lang="scss" scoped></style>
