import { StatusCode } from '~/types/com-types';

export default defineNuxtRouteMiddleware(async (to) => {
	// 路由白名单
	const nuxtApp = useNuxtApp();
	const whiteRoutes = ['/admin/login'];
	const path = to.path;
	const cookies = useUserState().getToken();

	if (!whiteRoutes.includes(path)) {
		if (!cookies) {
			return navigateTo('/admin/login');
		} else {
			// 验证token
			try {
				const res = await postApi<{ token: string }, any>('/user/verify-token', {
					body: {
						token: cookies,
					},
				});

				if (res.code === StatusCode.UNAUTHORIZED) {
					nuxtApp.runWithContext(() => {
						useUserState().setToken('');
						return navigateTo('/admin/login', { replace: true });
					});
				}
			} catch (error) {
				nuxtApp.runWithContext(() => {
					useUserState().setToken('');
					return navigateTo('/admin/login', { replace: true });
				});
			}
		}
	}

	return true;
});
