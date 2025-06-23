export default defineNuxtRouteMiddleware((to, _from) => {
	const path = to.path;

	const { menuList, menuId } = storeToRefs(useJojoHeader());
	const { avatarUrl } = storeToRefs(useVueStarport());

	// 动态切换头像
	avatarUrl.value = path.startsWith('/record/') ? 'my' : 'index_bg';

	// 优先匹配最长的路径（避免 / 匹配到所有路径）
	const matched = menuList.value
		.filter(item => path === item.path || path.startsWith(`${item.path}/`))
		.sort((a, b) => b.path.length - a.path.length)[0];

	menuId.value = matched ? matched.id : 0;

	// return true;
});
