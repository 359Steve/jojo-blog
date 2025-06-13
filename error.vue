<script lang="ts" setup>
const name = ref<string>('');
const email = ref<string>('');
const content = ref<string>('');

const disabled = computed(() => {
	return !name.value || !email.value || !content.value;
});
</script>

<template>
	<NuxtLayout name="jojomain">
		<template #page>
			<NuxtLayout name="mainbox">
				<template #childPage>
					<ErrorMain>
						<template #error>
							<main class="mx-auto w-full">
								<span class="text-4xl">✉️</span>
								<h1
									class="from-primary to-secondary mb-2 bg-gradient-to-r bg-clip-text text-base font-black md:text-xl lg:text-4xl">
									提交问题
								</h1>
								<p class="text-secondary mb-10 text-sm font-normal text-gray-500/50 lg:text-base">
									请通过电子邮件或填写此问题表格。我会在最短的时间内解决问题。
								</p>
								<form class="form">
									<div class="flex flex-col justify-between gap-5 md:flex-row">
										<input v-model="name" placeholder="你的名字"
											class="w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 focus:border-emerald-500 focus:outline-none dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:focus:border-emerald-500"
											type="text" />
										<input v-model="email" placeholder="你的邮箱"
											class="block w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 invalid:border-red-500 invalid:text-red-600 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 focus:invalid:border-red-500 focus:invalid:ring-red-500 dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:invalid:border-red-500 dark:invalid:text-red-600 dark:focus:border-emerald-500 dark:focus:invalid:border-red-500 dark:focus:invalid:ring-red-500"
											type="email" />
									</div>
									<div>
										<textarea v-model="content" placeholder="你的问题"
											class="mt-4 h-[9em] w-full rounded-md border bg-neutral-100 px-2 py-2 text-sm text-neutral-700 focus:border-emerald-500 focus:outline-none dark:border-gray-100/20 dark:bg-gray-100/10 dark:text-[white] dark:focus:border-emerald-500 sm:h-[15em]"></textarea>
									</div>
									<ElButton :disabled="disabled" type="primary">
										<span class="text-sm font-bold text-neutral-500">提交</span>
									</ElButton>
								</form>
							</main>
						</template>
					</ErrorMain>
				</template>
			</NuxtLayout>
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
