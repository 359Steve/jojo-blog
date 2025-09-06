<script lang="ts" setup></script>

<template>
	<div class="relative h-[48px] w-full overflow-hidden">
		<Transition name="sidebarLogoFade">
			<RouterLink key="expand" class="flex h-full flex-nowrap items-center pl-[10px]" to="/admin">
				<img src="../../assets/svg/logo.svg" alt="logo" />
				<span
					class="m-[2px_0_0_12px] inline-block h-[32px] overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-[600] leading-[32px] text-admin-sub-menu-active-text">
					JoJoAdmin
				</span>
			</RouterLink>
		</Transition>
	</div>
</template>

<style lang="scss" scoped></style>
