<script lang="ts" setup>
import type { NuxtError } from 'nuxt/app';
import type { CreateErrorMessageDto } from './server/dto/CreateErrorMessageDto';

const { error } = defineProps({
	error: Object as () => NuxtError,
});

const errorData = ref<string>(error?.message || '未知错误');
const formData = reactive<CreateErrorMessageDto>({
	name: '',
	email: '',
	content: '',
});

const disabled = computed(() => {
	return !formData.name || !formData.email || !formData.content;
});

const sendEmail = async () => {
	try {
		const newFormData = { ...formData };
		formData.name = '';
		formData.email = '';
		formData.content = '';
		const res = await sendErrorEmail(newFormData);
		if (!res.data?.messageId) throw new Error(res.msg);
		errorData.value = res.msg;
	} catch (err) {
		errorData.value = (err as Error).message || '提交失败，请稍后重试';
	}
};
</script>

<template>
	<NuxtLayout name="jojomain">
		<template #page>
			<ErrorMain>
				<template #error>
					<main class="mx-auto w-full">
						<span class="text-4xl">✉️</span>
						<h1
							class="from-primary to-secondary mb-2 bg-gradient-to-r bg-clip-text text-base font-black md:text-xl lg:text-4xl">
							{{ errorData }}
						</h1>
						<p class="text-secondary mb-10 text-sm font-normal text-gray-500/50 lg:text-base">
							如果是系统问题,请通过电子邮件或填写此问题表格。我会在最短的时间内解决问题。
						</p>
						<form class="form">
							<div class="flex flex-col justify-between gap-5 md:flex-row">
								<input v-model="formData.name" placeholder="你的名字"
									class="w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 focus:border-emerald-500 focus:outline-none dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:focus:border-emerald-500"
									type="text">
								<input v-model="formData.email" placeholder="你的邮箱"
									class="block w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 invalid:border-red-500 invalid:text-red-600 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:invalid:border-red-500 dark:invalid:text-red-600 dark:focus:border-emerald-500 dark:focus:invalid:border-red-500 dark:focus:invalid:ring-red-500"
									type="email">
							</div>
							<div>
								<textarea v-model="formData.content" placeholder="你的问题"
									class="mt-4 h-[9em] w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 focus:border-emerald-500 focus:outline-none dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:focus:border-emerald-500 sm:h-[15em]" />
							</div>
							<ElButton :disabled="disabled" type="primary" @click="sendEmail">
								<span class="text-sm font-bold text-neutral-500">提交</span>
							</ElButton>
						</form>
					</main>
				</template>
			</ErrorMain>
		</template>
	</NuxtLayout>
</template>

<style lang="postcss" scoped>
:deep(.el-button) {
	@apply mt-4 h-11 w-full border-none bg-neutral-100 px-2 py-2 dark:bg-gray-100/10;
}

:deep(.el-button.is-disabled:hover) {
	@apply bg-neutral-100;
}
</style>
