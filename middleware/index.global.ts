export default defineNuxtRouteMiddleware((to, _from) => {
	to.path = normalizePath(to.path);
	const path = to.path;

	const { menuList, menuId } = storeToRefs(useJojoHeader());

	// 优先匹配最长的路径（避免 / 匹配到所有路径）
	const matched = menuList.value
		.filter((item) => path === item.path || path.startsWith(`${item.path}/`))
		.sort((a, b) => b.path.length - a.path.length)[0];

	menuId.value = matched ? matched.id : 0;

	return true;
});
