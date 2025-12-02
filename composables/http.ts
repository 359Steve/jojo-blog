import type { UseFetchOptions } from 'nuxt/app';
import { StatusCode } from '~/types/com-types';

export const apiCore = <Rq, Rp>(url: string, option?: Options<UseFetchOptions<NewResponse<Rp>>, Rq>) => {
	// 获取全局变量
	const appConfig = useAppConfig();
	// 获取nuxtApp实例
	const nuxtApp = useNuxtApp();

	return useFetch<NewResponse<Rp>>(url, {
		baseURL: appConfig.baseUrl,
		...option,

		// 设置请求拦截
		onRequest({ options }) {
			if (import.meta.server) {
				const ssrHeaders = useRequestHeaders(['cookie']);
				options.headers = {
					...ssrHeaders,
					...options.headers,
				};
			} else {
				options.headers = {
					Authorization: `Bearer ${useUserState().getToken() ?? ''}`,
					...options.headers,
				} as Headers;
			}
		},

		// 响应拦截
		onResponse({ response }) {
			if (!response.ok) return;
			const data = response._data as NewResponse<Rp>;
			if (data.code !== StatusCode.SUCCESS) {
				const error = data as NewResponse<{ message: string }>;
				if (import.meta.client) {
					// 直接提示错误信息
					ElMessage({
						type: 'error',
						message: error.msg || error.data.message || '请求出错！',
					});
				} else {
					// 跳转错误页面
					nuxtApp.runWithContext(() => {
						showError({
							statusCode: error.code || 500,
							message: error.msg || error.data.message || '请求出错！',
							data: error.data,
						});
					});
				}
			}
		},

		// 响应失败
		onResponseError({ response }) {
			const error = response._data as NewResponse<{ message: string }>;
			// 如果是客户端直接提示错误信息
			if (import.meta.client) {
				ElMessage({
					type: 'error',
					message: error.msg || error.data.message || '请求出错！',
				});
			} else {
				// 跳转错误页面
				nuxtApp.runWithContext(() => {
					showError({
						statusCode: error.code || 500,
						message: error.msg || error.data.message || '请求出错！',
						data: error.data,
					});
				});
			}
		},
	});
};

// GET请求封装
export const useGet = <Rq, Rp>(
	url: string,
	option?: Options<UseFetchOptions<NewResponse<Rp>>, Rq>,
): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'get',
			...option,
		})
			.then((res) => {
				res.data.value && resolve(res.data.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// POST 封装
export const postApi = <Rq, Rp>(
	url: string,
	option?: Options<UseFetchOptions<NewResponse<Rp>>, Rq>,
): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'post',
			...option,
		})
			.then((res) => {
				res.data.value && resolve(res.data.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// DELETE 封装
export const deleteApi = <Rq, Rp>(
	url: string,
	option?: Options<UseFetchOptions<NewResponse<Rp>>, Rq>,
): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'delete',
			...option,
		})
			.then((res) => {
				res.data.value && resolve(res.data.value);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
