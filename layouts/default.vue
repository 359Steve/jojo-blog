<script lang="ts" setup>
const route = useRoute();

// 获取当前路由路径
const isAdmin = computed(() => route.path.startsWith('/admin'));
const layout = computed(() => isAdmin.value ? 'admin' : 'jojomain')
</script>

<template>
	<NuxtLayout :name="layout">
		<template #page>
			<slot />
		</template>
	</NuxtLayout>
</template>

<style lang="scss" scoped></style>
