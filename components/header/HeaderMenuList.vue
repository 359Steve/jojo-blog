<script lang="ts" setup>
const { menuList, drawer, menuId } = storeToRefs(useJojoHeader());

const toPath = (item: (typeof menuList.value)[number]) => {
	menuId.value = item.id;
	drawer.value = false;
	navigateTo(item.path);
};
</script>

<template>
	<div class="w-full">
		<ul class="w-full items-center justify-center sm:flex sm:gap-x-12">
			<li
				v-for="item in menuList"
				:key="item.id"
				:class="[
					`mb-4 rounded-base px-4 leading-[3rem] shadow-sm hover:cursor-pointer sm:mb-0 sm:h-full sm:rounded-none sm:px-0 sm:shadow-none`,
					menuId === item.id
						? 'bg-black shadow-none dark:bg-[white] sm:bg-inherit sm:dark:bg-inherit'
						: 'hover:bg-[#DBDBDB] hover:text-black sm:hover:bg-transparent sm:dark:text-white',
				]"
				@click="toPath(item)"
			>
				<span
					:class="[
						menuId === item.id
							? 'font-bold text-white dark:text-black sm:text-black sm:dark:text-white'
							: 'text-gray-500',
					]"
				>
					{{ item.title }}
				</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped></style>
