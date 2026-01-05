<script lang="ts" setup>
const route = useRoute();
const jojoMain = useTemplateRef('jojoMain');
const windWidth = ref<number>(0);

onMounted(() => {
	nextTick(() => {
		if (jojoMain.value) {
			useResizeObserver(jojoMain, (entries) => {
				const [{ inlineSize: width, blockSize: _height }] = entries[0].borderBoxSize;
				windWidth.value = width;
			});
		}
	});
});
</script>

<template>
	<PreviewImageMask />
	<div ref="jojoMain" class="relative h-full w-full">
		<ClientOnly>
			<!-- <SeasonFloatDown v-if="windWidth > 640" /> -->
			<RecordBackground v-if="windWidth > 640" class-name="w-full h-[100dvh] fixed inset-0 z-[-1]" />
			<BgcanvasBranchCanvas v-else />
		</ClientOnly>
		<ElBacktop :right="50" :bottom="100">
			<i class="ri-arrow-up-line" />
		</ElBacktop>
		<div class="flex h-full min-h-screen w-full flex-col">
			<!-- 导航栏 -->
			<HeaderBox />
			<ClientOnly>
				<NuxtLoadingIndicator color="#A3AAB6" />
			</ClientOnly>
			<div class="flex-1" :class="[route.path === '/' ? 'flex items-center justify-center' : '']">
				<NuxtLayout name="mainbox">
					<template #childPage>
						<StarportCarrier>
							<slot name="page" />
						</StarportCarrier>
					</template>
				</NuxtLayout>
			</div>
			<FooterBox />
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-backtop) {
	@apply hidden items-center justify-center text-black dark:text-white sm:flex;
}
</style>
