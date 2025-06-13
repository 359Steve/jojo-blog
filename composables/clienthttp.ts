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
interface BaseResponse<T> extends H3Error<T> {
	code: number;
	msg: string;
}

// let Authorization: Record<string, string> | null = null;

export const fetchApiCore = <Rq = any, Rp = any>(url: string, option: Options<Rq | any>) => {
	// 获取全局变量
	const appConfig = useAppConfig();
	// 获取nuxtApp实例
	const nuxtApp = useNuxtApp();
	// 获取token
	const token: string = useUserState().getToken() || '';
	// Authorization = token ? { Authorization: `Bearer ${token}` } : null;

	return $fetch<BaseResponse<Rp>>(url, {
		baseURL: appConfig.baseUrl,
		method: option?.method as any,
		...option,

		// 设置请求拦截
		onRequest({ options }) {
			options.headers = {
				Authorization: `Bearer ${token}`,
				...options.headers
			} as Headers & { Authorization?: string };
		},

		// 响应拦截
		onResponse({ response }) {
			if (!response.ok) return;
			const data = response._data as BaseResponse<Rp>;
			if (data.code !== 200) {
				const error = data as BaseResponse<{ message: string }>;
				if (import.meta.client) {
					// 直接提示错误信息
					ElMessage({
						type: 'error',
						message: data.msg || data.statusMessage || '请求出错！'
					});
				} else {
					// 跳转错误页面
					nuxtApp.runWithContext(() => {
						navigateTo({
							path: '/pageError',
							query: {
								code: data.code,
								msg: data.msg || data.statusMessage || '请求出错！'
							}
						});
					});
				}
			}
		},

		// 响应失败
		onResponseError({ response }) {
			const data = response._data as BaseResponse<Rp>;
			// 如果是客户端直接提示错误信息
			if (import.meta.client) {
				ElMessage({
					type: 'error',
					message: data.msg || data.statusMessage || '请求出错！'
				});
			} else {
				// 跳转错误页面
				nuxtApp.runWithContext(() => {
					navigateTo({
						path: '/pageError',
						query: {
							code: data.code,
							message: data.msg || data.statusMessage || '请求出错！'
						}
					});
				});
			}
		}
	});
};

// GET请求封装
export const fetchUseGet = <Rq = any, Rp = any>(url: string, option: Options<Rq> = {}): Promise<BaseResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		fetchApiCore<Rq, Rp>(url, {
			method: 'get',
			...option
		})
			.then(res => {
				resolve(res as BaseResponse<Rp>);
			})
			.catch(err => {
				reject(err);
			});
	});
};

// POST 封装
export const fetchPostApi = <Rq = any, Rp = any>(url: string, option?: Options<Rq>): Promise<BaseResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		fetchApiCore<Rq, Rp>(url, {
			method: 'post',
			...option
		})
			.then(res => {
				resolve(res as BaseResponse<Rp>);
			})
			.catch(err => {
				reject(err);
			});
	});
};
