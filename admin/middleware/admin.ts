export default defineNuxtRouteMiddleware(to => {
	// 路由白名单
	const whiteRoutes = ['/admin/login'];
	const path = to.path;
	const cookies = useUserState().getToken();

	if (!whiteRoutes.includes(path)) {
		if (!cookies) return navigateTo('/admin/login');
		try {
			// 验证token
			const payload = verifyToken(cookies || '');
			if (!payload) return navigateTo('/admin/login');
		} catch {
			return navigateTo('/admin/login');
		}
	}

	return true;
});
