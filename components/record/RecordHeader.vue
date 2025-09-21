<script lang="ts" setup>
const userInfo = reactive(useVueStarport().getUserInfo());
</script>

<template>
	<div class="mb-12 w-full sm:mb-20">
		<div class="relative flex flex-col space-x-0 sm:flex-row sm:space-x-10">
			<div class="mb-4 flex w-full items-center justify-center sm:mb-0 sm:w-40 sm:justify-normal">
				<Starport id="record-image-my-id" port="my-id"
					class="aspect-square h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32">
					<RecordImage class="rounded-[50%] transition-all duration-1000" />
				</Starport>
			</div>
			<div class="grid">
				<AnimationRevealOnScroll animation-class="'animate__fadeInDown'">
					<h1
						class="from-primary to-secondary w-full bg-gradient-to-r bg-clip-text text-base font-black sm:text-xl md:text-2xl lg:text-4xl">
						我的简历
					</h1>
				</AnimationRevealOnScroll>
				<AnimationRevealOnScroll animation-class="'animate__fadeInDown'"
					base-class="'flex items-center text-sm lg:text-base font-normal text-secondary mt-4'">
					<span>{{ userInfo.sign }}</span>
				</AnimationRevealOnScroll>
				<div class="mt-4 flex w-full items-center gap-2">
					<AnimationRevealOnScroll v-for="item in userInfo.tags" :key="item.tag_id"
						animation-class="'animate__fadeInDown'" base-class="'w-fit'">
						<a :href="item.tag.url" target="_blank" rel="noopener noreferrer" class="button">
							<ElButton size="default">
								<template #icon>
									<div class="text-[20px]">
										<Icon :icon="item.tag.icon" />
									</div>
								</template>
								<span>{{ item.tag.name }}</span>
							</ElButton>
						</a>
					</AnimationRevealOnScroll>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-button) {
	@apply text-gray-400 hover:bg-gray-400/20 hover:text-black dark:hover:text-white;
}
</style>
