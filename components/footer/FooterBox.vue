<script lang="ts" setup>
import BiliIcon from './utils/bilibili';
const queryData = async () => {
	const res = await fetchPostApi<{ user_name: string; password: string }, { accessToken: string }>('/user-login', {
		body: {
			user_name: 'jojo',
			password: '123456'
		}
	});

	if (res.code === 200) {
		useUserState().setToken(res.data.accessToken);
	}
};
</script>

<template>
	<div class="mt-8 grid w-full grid-cols-1 gap-2 py-2 sm:grid-cols-2">
		<div class="flex items-center justify-center sm:hidden">
			<a href="https://space.bilibili.com/457627448?spm_id_from=333.1007.0.0" target="_blank"
				rel="noopener noreferrer" class="flex items-center gap-2">
				<BiliIcon icon-class="text-base"></BiliIcon>
			</a>
		</div>
		<div class="col-span-1 flex items-center justify-center sm:col-span-2">
			<a href="https://space.bilibili.com/457627448?spm_id_from=333.1007.0.0" target="_blank"
				rel="noopener noreferrer" class="mr-4 flex items-center gap-2">
				<BiliIcon icon-class="hidden sm:block"></BiliIcon>
			</a>
			<span class="text-xs" @click="queryData">Copyright © 2023 Josef Joestar</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
