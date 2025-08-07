<script lang="ts" setup>
const appWrapperRef = useTemplateRef('appWrapperRef');
const leftIsCollapse = ref<boolean>(false);

onMounted(() => {
	nextTick(() => {
		if (appWrapperRef.value) {
			useResizeObserver(appWrapperRef, entries => {
				const [{ inlineSize: width, blockSize: _height }] = entries[0].borderBoxSize;
				if (width > 0 && width <= 760) {
					leftIsCollapse.value = true;
				} else if (width > 760 && width <= 990) {
					leftIsCollapse.value = true;
				} else if (width > 990) {
					leftIsCollapse.value = false;
				} else {
					leftIsCollapse.value = false;
				}
			});
		}
	});
});
</script>

<template>
	<div ref="appWrapperRef" class="h-[100vh] w-full bg-[#EFF2F5]">
		<ElContainer class="h-full w-full">
			<AdminAside v-model:left-is-collapse="leftIsCollapse" class="hidden sm:block" />
			<ElContainer>
				<ElHeader>
					<AdminHeader />
				</ElHeader>
				<ElMain>
					<AdminMain>
						<slot />
					</AdminMain>
				</ElMain>
				<ElFooter>
					<AdminFooter />
				</ElFooter>
			</ElContainer>
		</ElContainer>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-header) {
	@apply p-0;
}

:deep(.el-footer) {
	@apply p-0;
}
</style>
