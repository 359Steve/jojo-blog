import type { CookieRef } from 'nuxt/app';

const { getToken } = useUserState();

export default defineNuxtRouteMiddleware(async (to) => {
	// 路由白名单
	const whiteRoutes = ['/admin/login'];
	const path = to.path;
	const userState = useCookie('userState') as CookieRef<{ token: string; isUnauthorized: boolean }>;
	const user_name = useCookie('user_name');

	if (!whiteRoutes.includes(path) && !path.startsWith('/api')) {
		if (!getToken()) {
			return navigateTo('/admin/login');
		} else {
			// 验证token
			if (getToken() !== userState.value?.token || !user_name.value) {
				ElMessage({
					type: 'error',
					message: '登录已失效！',
				});
				useUserState().setToken('');
				useUserState().setIsUnauthorized(false);
				return navigateTo('/admin/login', { replace: true });
			}
		}
	}

	return true;
});
