<script lang="ts" setup>
const { space = true, sm = true } = defineProps<{
	space?: boolean;
	sm?: boolean;
}>();
const { userInfo } = storeToRefs(useBlogUserInfo());
</script>

<template>
	<div class="mb-12 w-full">
		<div class="relative flex flex-col space-x-0"
			:class="[space ? 'sm:space-x-10' : 'lg:space-x-10', sm ? 'sm:flex-row' : 'lg:flex-row']">
			<div class="mb-4 flex w-full items-center justify-center sm:w-auto"
				:class="[sm ? 'sm:mb-0 sm:justify-normal' : 'lg:mb-0 lg:justify-normal']">
				<Starport id="record-image-my-id" port="my-id"
					class="aspect-square h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 xl:h-32 xl:w-32">
					<RecordImage class="rounded-[50%] transition-all duration-1000" />
				</Starport>
			</div>
			<div class="grid">
				<div>
					<h1
						class="from-primary to-secondary w-full bg-gradient-to-r bg-clip-text text-[16px] font-black text-rose-500 sm:text-xl md:text-2xl lg:text-3xl">
						{{ userInfo?.pet_name }}
					</h1>
				</div>
				<div class="text-secondary mt-4 flex items-center font-normal">
					<span>{{ userInfo?.sign }}</span>
				</div>
				<div class="mt-4 flex w-full items-center gap-2">
					<div v-for="item in userInfo?.tags" :key="item.tag_id" class="w-fit">
						<a :href="item.tag.url" target="_blank" rel="noopener noreferrer" class="button">
							<ElButton size="default"
								class="!text-black hover:!border-gray-300 dark:!text-white dark:hover:!border-white">
								<template #icon>
									<div class="text-[20px]">
										<Icon :icon="item.tag.icon" />
									</div>
								</template>
								<span>{{ item.tag.name }}</span>
							</ElButton>
						</a>
					</div>
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
