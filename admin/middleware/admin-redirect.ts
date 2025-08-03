export default defineNuxtRouteMiddleware(to => {
	const menuData = getRouterConfig();

	const path = to.path;
	const menuItem = menuData.find(item => item.path.replace(/\/$/, '') === path.replace(/\/$/, ''));

	if (menuItem && menuItem.children) {
		return navigateTo(menuItem.children[0].path);
	}

	return true;
});
