<script lang="ts" setup>
import { StatusCode } from '~/types/com-types';

const loginOut = (): void => {
	ElMessageBox.confirm('确定退出系统吗?', {
		cancelButtonText: '取消',
		confirmButtonText: '确定',
		type: 'warning'
	}).then(async () => {
		const res = await fetchPostApi('/logout')

		if (res.code === StatusCode.SUCCESS) {
			useUserState().setToken('');
			navigateTo({ path: '/admin/login' });
		} else {
			ElMessage({
				type: 'error',
				message: res.msg
			});
		}
	})
}
</script>

<template>
	<ElDropdown trigger="click">
		<span class="flex h-[48px] w-fit cursor-pointer items-center gap-[6px] px-[6px] hover:bg-admin-header-bg-hover">
			<ElAvatar :size="24" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
				type="circle" />
			<p>admin</p>
		</span>
		<template #dropdown>
			<ElDropdownMenu class="!p-0">
				<ElDropdownItem @click="loginOut">
					<Icon icon="ri:logout-circle-line" class="mr-[5px]" width="16" height="16"></Icon>
					<span class="text-[14px]">退出系统</span>
				</ElDropdownItem>
				<ElDropdownItem @click="navigateTo({ path: '/admin/userinfo/123123' })">
					<Icon icon="ri:user-line" class="mr-[5px]" width="16" height="16"></Icon>
					<span class="text-[14px]">个人中心</span>
				</ElDropdownItem>
			</ElDropdownMenu>
		</template>
	</ElDropdown>
</template>

<style lang="postcss" scoped>
:deep(.el-dropdown-menu__item:hover) {
	@apply !bg-admin-dropdown-menu-bg !text-admin-tag-active-text;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
	@apply !bg-admin-dropdown-menu-bg !text-admin-tag-active-text;
}
</style>
