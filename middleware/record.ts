export default defineNuxtRouteMiddleware(to => {
	const path = to.path;

	// 精准匹配 '/record' 或 '/record/'
	if (path === '/record') {
		return navigateTo('/record/home');
	}

	return true;
});
