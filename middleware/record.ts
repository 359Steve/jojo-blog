export default defineNuxtRouteMiddleware(to => {
	const path = to.path;

	if (path === '/record') {
		return navigateTo('/record/home');
	}

	return true;
});
