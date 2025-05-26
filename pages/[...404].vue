<script lang="ts" setup></script>

<template>
	<ErrorMain>
		<template #error>
			<div class="w-full text-center sm:w-10/12 md:w-8/12">
				<div
					class="h-[250px] bg-[url(~/assets/image/404-ezgif.com-gif-maker.gif)] bg-contain bg-center bg-no-repeat sm:h-[350px] md:h-[400px]"
				>
					<h1 class="pt-6 text-center text-6xl sm:pt-8 sm:text-7xl md:text-8xl">404</h1>
				</div>

				<div class="mt-[-50px]">
					<h3 class="mb-4 text-2xl font-bold sm:text-3xl">Look like you're lost</h3>
					<p class="mb-6 sm:mb-5">The page you are looking for is not available!</p>

					<ElButton type="primary" class="my-5" @click="navigateTo({ replace: true, path: '/' })">回到首页</ElButton>
				</div>
			</div>
		</template>
	</ErrorMain>
</template>

<style lang="postcss" scoped>
:deep(.el-button) {
	@apply bg-black text-white dark:bg-[white] dark:text-black;
}
</style>
