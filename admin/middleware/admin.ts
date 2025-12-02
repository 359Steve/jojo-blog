import type { CookieRef } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
	const whiteRoutes = ['/admin/login'];
	const path = to.path;

	if (whiteRoutes.includes(path) || path.startsWith('/api')) {
		return;
	}

	const userState = useCookie('userState') as CookieRef<{ token: string; isUnauthorized: boolean }>;
	const cookieToken = userState.value?.token;
	if (!cookieToken) {
		return navigateTo('/admin/login', { replace: true });
	}

	const { getToken } = useUserState();
	const currentToken = getToken();

	if (currentToken !== cookieToken) {
		useUserState().setToken('');
		useUserState().setIsUnauthorized(false);

		if (import.meta.client) {
			ElMessage({
				type: 'error',
				message: '登录已失效！',
				duration: 2000,
			});
		}

		return navigateTo('/admin/login', { replace: true });
	}

	return;
});
