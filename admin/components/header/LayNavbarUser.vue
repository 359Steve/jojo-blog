<script lang="ts" setup></script>

<template>
	<ElDropdown trigger="click">
		<span class="flex h-[48px] w-fit cursor-pointer items-center gap-[6px] px-[6px] hover:bg-[#f1f1f1]">
			<ElAvatar :size="24" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
				type="circle" />
			<p class="dark:text-white">admin</p>
		</span>
		<template #dropdown>
			<ElDropdownMenu class="!p-0">
				<ElDropdownItem>
					<Icon icon="ri:logout-circle-line" class="mr-[5px]" width="16" height="16"></Icon>
					<span class="text-[14px]">退出系统</span>
				</ElDropdownItem>
				<ElDropdownItem>
					<Icon icon="ri:user-line" class="mr-[5px]" width="16" height="16"></Icon>
					<span class="text-[14px]">个人中心</span>
				</ElDropdownItem>
			</ElDropdownMenu>
		</template>
	</ElDropdown>
</template>

<style lang="postcss" scoped>
:deep(.el-dropdown-menu__item:hover) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}
</style>
