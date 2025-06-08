<script lang="ts" setup>
import type { user_info } from '@prisma/client';

const queryData = async () => {
	const res = await fetchPostApi<Omit<user_info, 'id'>, any>('/user', {
		body: {
			user_name: 'jojo2',
			password: '123456',
			pet_name: 'josef',
			avatar_url: 'index_bg',
			sign: '一个前端小白',
			describe: '一个前端小白'
		}
	});

	if (res.code === 200) {
		ElMessage.success('注册成功');
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
