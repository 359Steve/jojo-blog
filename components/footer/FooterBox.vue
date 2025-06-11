<script lang="ts" setup>
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
				rel="noopener noreferrer">
				<img class="mr-4 h-4 cursor-pointer" src="~/assets/image/bilibili.png" alt="我的b站" />
			</a>
		</div>
		<div class="col-span-1 flex items-center justify-center sm:col-span-2">
			<a href="https://space.bilibili.com/457627448?spm_id_from=333.1007.0.0" target="_blank"
				rel="noopener noreferrer">
				<img class="mr-4 hidden h-4 cursor-pointer sm:block" src="~/assets/image/bilibili.png" alt="我的b站" />
			</a>
			<span class="text-xs" @click="queryData">Copyright © 2023 Josef Joestar</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
