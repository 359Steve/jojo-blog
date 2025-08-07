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
	<div class="absolute bottom-0 h-[40px] w-full cursor-pointer leading-[40px] shadow-[0_0_6px_-3px_#409EFF]"
		@click.stop="emit('toggleSideBar')">
		<div class="flex h-full w-[54px] items-center justify-center">
			<ElTooltip :content="isCollapse ? '展开菜单' : '收起菜单'" placement="right" :effect="theme">
				<Icon :icon="isCollapse ? 'ri:menu-unfold-fill' : 'ri:menu-fold-fill'" width="24" height="24" />
			</ElTooltip>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
