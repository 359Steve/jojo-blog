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
					? 'bg-black shadow-none dark:bg-[white] sm:bg-inherit sm:dark:bg-inherit'
					: 'hover:bg-[#DBDBDB] hover:text-blog-primary sm:hover:bg-transparent',
			]" @click="toPath(item)">
				<span :class="[
					menuId === item.id
						? 'font-bold text-white dark:text-blog-primary sm:text-blog-primary'
						: 'text-blog-secondary',
				]">
					{{ item.title }}
				</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>
