<script lang="ts" setup>
const route = useRoute();

// 获取当前路由路径
const isAdmin = computed(() => route.path.startsWith('/admin'));
</script>

<template>
	<!-- 后台系统 -->
	<NuxtLayout v-if="isAdmin" name="admin">
		<template #page>
			<slot />
		</template>
	</NuxtLayout>

	<!-- 前台系统：jojomain 嵌套 mainbox -->
	<NuxtLayout v-else name="jojomain">
		<template #page>
			<NuxtLayout v-if="!isAdmin" name="mainbox">
				<template #childPage>
					<StarportCarrier>
						<slot />
					</StarportCarrier>
				</template>
			</NuxtLayout>
		</template>
	</NuxtLayout>
</template>

<style lang="scss" scoped></style>
