<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { loginRules } from './utils/rule';
import { Avatar, DarkIcon, DayIcon, Illustration, bg } from './utils/static';

const ruleForm = reactive({
	username: 'admin',
	password: 'admin@123'
});

const ruleFormRef = ref<FormInstance>();
const disabled = ref<boolean>(false);
const loading = ref<boolean>(false);
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference !== 'dark');

const onLogin = (formEl: FormInstance | undefined): void => {
	formEl?.validate(async valid => {
		if (valid) {
			const res = await fetchPostApi<{ user_name: string; password: string }, { accessToken: string }>('/user-login', {
				body: {
					user_name: ruleForm.username,
					password: ruleForm.password
				}
			});

			if (res.code === 200) {
				useUserState().setToken(res.data.accessToken);

				// 跳转到首页
				navigateTo('/admin/home');
			}
		}
	});
};

const changeTheme = (value: boolean | string | number): void => {
	useJojoColorMode().setDarkMode(value ? 'light' : 'dark');
};
</script>

<template>
	<div class="select-none">
		<img :src="bg" class="admin-md:block fixed z-[-1] hidden h-full w-[80%]" />
		<div class="absolute right-5 top-3 flex">
			<!-- 主题 -->
			<ElSwitch v-model="selectTheme" inline-prompt :active-icon="DayIcon" :inactive-icon="DarkIcon"
				@change="changeTheme" />
		</div>
		<div
			class="admin-md:grid-cols-2 admin-lg:gap-[18rem] grid h-[100vh] w-full max-w-full grid-cols-1 gap-[9rem] px-8 py-0">
			<div class="admin-md:flex hidden items-center justify-end">
				<Illustration class="admin-lg:w-[500px] w-[360px]"></Illustration>
			</div>
			<div class="admin-md:justify-normal flex items-center justify-center overflow-hidden text-center">
				<div class="admin-lg:w-[360px] w-[290px]">
					<Avatar class="h-[80px] w-full" />
					<Motion>
						<h2 class="font-cmm mx-0 my-[8px] text-[2.24rem] font-bold text-[#999]">JOJOADMIN</h2>
					</Motion>

					<ElForm ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
						<Motion :delay="100">
							<ElFormItem prop="username">
								<ElInput v-model="ruleForm.username" clearable placeholder="账号">
									<template #prefix>
										<Icon icon="ri:user-fill" />
									</template>
								</ElInput>
							</ElFormItem>
						</Motion>

						<Motion :delay="150">
							<ElFormItem prop="password">
								<ElInput v-model="ruleForm.password" clearable show-password placeholder="密码">
									<template #prefix>
										<Icon icon="ri:lock-fill" />
									</template>
								</ElInput>
							</ElFormItem>
						</Motion>

						<Motion :delay="250">
							<ElButton size="default" type="primary" :loading="loading" :disabled="disabled"
								@click="onLogin(ruleFormRef)">
								登录
							</ElButton>
						</Motion>
					</ElForm>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-button) {
	@apply mt-4 w-full border-none bg-[#409EFF];
}

:deep(.is-focus) {
	@apply shadow-[0_0_0_1px_#409EFF_inset];
}
</style>
