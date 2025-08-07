<script lang="ts" setup>
const theme = ref(useJojoColorMode().getDarkMode().preference);
const emit = defineEmits<{
	(e: 'toggleSideBar'): void;
}>();

const { isCollapse } = defineProps<{
	isCollapse: boolean;
}>();
</script>

<template>
	<ElTooltip :content="isCollapse ? '展开菜单' : '收起菜单'" placement="right" :effect="theme">
		<div class="absolute bottom-0 flex h-[40px] w-full cursor-pointer !justify-start leading-[40px] shadow-[0_0_6px_-3px_#409EFF]"
			@click.stop="emit('toggleSideBar')">
			<div class="flex h-full w-fit items-center justify-center px-3">
				<Icon :icon="isCollapse ? 'ri:menu-unfold-fill' : 'ri:menu-fold-fill'" width="24" height="24" />
			</div>
		</div>
	</ElTooltip>
</template>

<style lang="scss" scoped></style>
