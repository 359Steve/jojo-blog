import { StatusCode } from "~/types/com-types";

export default defineNuxtRouteMiddleware(async to => {
	// 路由白名单
	const whiteRoutes = ['/admin/login'];
	const path = to.path;
	const cookies = useUserState().getToken();

	if (!whiteRoutes.includes(path)) {
		if (!cookies) {
			return navigateTo('/admin/login');
		} else {
			// 验证token
			try {
				const res = await postApi<{ token: string }, any>('/verify-token', {
					body: {
						token: cookies
					}
				})
				return res.code === StatusCode.SUCCESS ? true : navigateTo('/admin/login');
			} catch (error) {
				return navigateTo('/admin/login');
			}
		}
	}

	return true;
});
