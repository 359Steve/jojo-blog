export default defineNuxtRouteMiddleware(to => {
	const menuData = getRouterConfig();

	const path = to.path;
	const menuItem = menuData.find(item => normalizePath(item.path) === path);

	if (menuItem && menuItem.children) {
		return navigateTo(menuItem.children[0].path);
	}

	return true;
});
