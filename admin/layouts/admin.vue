<script lang="ts" setup>
useHead({
	title: 'jojo-admin',
});

const route = useRoute();

// 获取当前路由路径
const isLogin = computed(() => route.name === 'admin-login');
const layout = computed(() => (isLogin.value ? 'login' : 'main'));
</script>

<template>
	<div class="relative h-fit w-full">
		<NuxtLoadingIndicator color="#A3AAB6" />
		<NuxtLayout :name="layout">
			<slot name="page" />
		</NuxtLayout>
	</div>
</template>

<style lang="scss" scoped></style>
