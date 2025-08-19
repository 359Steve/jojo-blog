import { StatusCode } from "~/types/com-types";

type Method = 'get' | 'post' | 'put' | 'delete';
// 自定义 Options 类型
type Options<T> = {
	baseURL?: string;
	method?: Method;
	body?: T;
	query?: T;
	params?: T;
	headers?: Record<string, string>;
	[key: string]: any;
};
// 响应基本信息类型
interface H3Error<T> {
	data: T;
	stack: any[];
	statusCode: number;
	statusMessage: string;
	[key: string]: any;
}

type NewResponse<T> = NitroResponse<T> & H3Error<T>

// let Authorization: Record<string, string> | null = null;

export const apiCore = <Rq = any, Rp = any>(url: string, option: Options<Rq | any>) => {
	// 获取全局变量
	const appConfig = useAppConfig();
	// 获取nuxtApp实例
	const nuxtApp = useNuxtApp();

	return useFetch<NewResponse<Rp>>(url, {
		baseURL: appConfig.baseUrl,
		method: option?.method as any,
		...option,

		// 设置请求拦截
		onRequest({ options }) {
			if (import.meta.server) {
				const ssrHeaders = useRequestHeaders(['cookie']);
				options.headers = {
					...ssrHeaders,
					...options.headers
				};
			} else {
				options.headers = {
					Authorization: `Bearer ${useUserState().getToken() ?? ''}`,
					...options.headers
				} as Headers & { Authorization: string };
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
						message: error.msg || error.data.message || '请求出错！'
					});
				} else {
					// 跳转错误页面
					nuxtApp.runWithContext(() => {
						navigateTo({
							path: '/pageError',
							query: {
								code: error.code,
								msg: error.msg || error.data.message || '请求出错！'
							}
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
					message: error.msg || error.data.message || '请求出错！'
				});
			} else {
				// 跳转错误页面
				nuxtApp.runWithContext(() => {
					navigateTo({
						path: '/pageError',
						query: {
							code: error.code,
							msg: error.msg || error.data.message || '请求出错！'
						}
					});
				});
			}
		}
	});
};

// GET请求封装
export const useGet = <Rq = any, Rp = any>(url: string, option: Options<Rq> = {}): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'get',
			...option
		})
			.then(res => {
				resolve(res.data.value as NewResponse<Rp>);
			})
			.catch(err => {
				reject(err);
			});
	});
};

// POST 封装
export const postApi = <Rq = any, Rp = any>(url: string, option?: Options<Rq>): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'post',
			...option
		})
			.then(res => {
				resolve(res.data.value as NewResponse<Rp>);
			})
			.catch(err => {
				reject(err);
			});
	});
};
