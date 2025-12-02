<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { StatusCode } from '~/types/com-types';

const { setToken, setIsUnauthorized } = useUserState();
const Illustration = getIcons().Illustration;
const Avatar = getIcons().Avatar;

const ruleForm = reactive({
	username: '',
	password: '',
});

const loginRules = reactive<FormRules>({
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur',
		},
	],
	password: [
		{
			validator: (_rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (!REGEXP_PWD.test(value)) {
					callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
});

const ruleFormRef = ref<FormInstance>();
const disabled = ref<boolean>(false);
const loading = ref<boolean>(false);

const onLogin = (): void => {
	ruleFormRef.value?.validate(async (valid) => {
		if (valid) {
			setIsUnauthorized(false);
			const res = await fetchPostApi<{ user_name: string; password: string }, { accessToken: string }>(
				'/user/user-login',
				{
					body: {
						user_name: ruleForm.username,
						password: ruleForm.password,
					},
				},
			);

			if (res.code === StatusCode.SUCCESS) {
				setToken(res.data.accessToken);
				useCookie('user_name').value = ruleForm.username;
				const { data } = await findUser(ruleForm.username);

				data &&
					useUserinfo().setUserInfo({
						...data,
						tags: data.tags.map((item) => item.tag_id).filter(Boolean),
					});
				// 跳转到首页
				navigateTo('/admin/');
			}
		}
	});
};
</script>

<template>
	<div class="select-none">
		<img v-lazy="getIcons().bg" class="fixed z-[-1] hidden h-full w-[80%] admin-md:block" />
		<div class="absolute right-5 top-3 flex">
			<!-- 主题 -->
			<LaySwitch />
		</div>
		<div
			class="grid h-[100vh] w-full max-w-full grid-cols-1 gap-[9rem] px-8 py-0 admin-md:grid-cols-2 admin-lg:gap-[18rem]">
			<div class="hidden items-center justify-end admin-md:flex">
				<Illustration class="w-[360px] admin-lg:w-[500px]" />
			</div>
			<div class="flex items-center justify-center overflow-hidden text-center admin-md:justify-normal">
				<div class="w-[290px] admin-lg:w-[360px]">
					<Avatar class="h-[80px] w-full" />
					<Motion>
						<h2 class="mx-0 my-[8px] font-cmm text-[2.24rem] font-bold text-[#999]">JOJOADMIN</h2>
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
								@click="onLogin">
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
