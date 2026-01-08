<script lang="ts" setup>
const { menuList, drawer, menuId } = storeToRefs(useJojoHeader());

const toPath = async (item: (typeof menuList.value)[number]) => {
	drawer.value = false;
	await navigateTo(item.path);
	menuId.value = item.id;
};
</script>

<template>
	<div class="w-full">
		<ul class="w-full items-center justify-center sm:flex sm:gap-x-12">
			<li v-for="item in menuList" :key="item.id" :class="[
				`mb-4 rounded-base px-4 leading-[3rem] shadow-sm hover:cursor-pointer sm:mb-0 sm:h-full sm:rounded-none sm:px-0 sm:shadow-none`,
				item.id === menuId
					? 'bg-blog-primary shadow-none sm:bg-inherit sm:dark:bg-inherit'
					: 'hover:text-blog-primary sm:hover:bg-transparent',
			]" @click="toPath(item)">
				<span :class="[
					menuId === item.id
						? 'text-blog-base-color sm:text-blog-primary font-bold'
						: 'text-blog-secondary',
				]">
					{{ item.title }}
				</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>
