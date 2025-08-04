<script lang="ts" setup>
const theme = ref(useJojoColorMode().getDarkMode().preference);
const emit = defineEmits<{
	(e: 'toggleSideBar'): void;
}>();
</script>

<template>
	<div class="absolute bottom-0 h-[40px] w-full cursor-pointer leading-[40px] shadow-[0_0_6px_-3px_#409EFF]"
		@click="emit('toggleSideBar')">
		<!-- <Icon icon=" mdi:receipt-text-arrow-left-outline" width="24" height="24" /> -->
		<div class="flex h-full w-[53px] items-center justify-center">
			<ElTooltip content="Bottom center" placement="right" :effect="theme">
				<Icon icon="mdi:receipt-text-arrow-right-outline" width="24" height="24" />
			</ElTooltip>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
