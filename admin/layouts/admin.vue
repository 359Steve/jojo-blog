<script lang="ts" setup>
useHead({
	title: 'jojo-admin'
});

const route = useRoute();

// 获取当前路由路径
const isLogin = computed(() => route.path.includes('/login'));
</script>

<template>
	<div class="relative h-fit w-full">
		<!-- 登录布局 -->
		<NuxtLayout v-if="isLogin" name="login">
			<slot name="page" />
		</NuxtLayout>

		<!-- 系统布局 -->
		<NuxtLayout v-else name="main">
			<slot name="page" />
		</NuxtLayout>
	</div>
</template>

<style lang="scss" scoped></style>
