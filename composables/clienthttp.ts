import { StatusCode } from '~/types/com-types';

export const fetchApiCore = <Rq = any, Rp = any>(url: string, option: Options<Rq | any>) => {
	// 获取全局变量
	const appConfig = useAppConfig();
	// 获取nuxtApp实例
	const nuxtApp = useNuxtApp();
	// 获取token
	const token: string = useUserState().getToken() || '';
	// Authorization = token ? { Authorization: `Bearer ${token}` } : null;

	return $fetch<NewResponse<Rp>>(url, {
		baseURL: appConfig.baseUrl,
		method: option?.method as any,
		...option,

		// 设置请求拦截
		onRequest({ options }) {
			options.headers = {
				Authorization: `Bearer ${token}`,
				...options.headers,
			} as Headers & { Authorization?: string };
		},

		// 响应拦截
		onResponse({ response }) {
			if (!response.ok) return;
			const data = response._data as NewResponse<Rp>;
			if (data.code !== StatusCode.SUCCESS) {
				const error = data as NewResponse<{ message: string }>;
				ElMessage({
					type: 'error',
					message: error.msg || error.data.message || '请求出错！',
				});
			}
		},

		// 响应失败
		onResponseError({ response }) {
			const error = response._data as NewResponse<{ message: string }>;
			ElMessage({
				type: 'error',
				message: error.msg || error.data.message || '请求出错！',
			});
		},
	});
};

// GET请求封装
export const fetchUseGet = <Rq = any, Rp = any>(url: string, option: Options<Rq> = {}): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		fetchApiCore<Rq, Rp>(url, {
			method: 'get',
			...option,
		})
			.then((res) => {
				resolve(res as NewResponse<Rp>);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// POST 封装
export const fetchPostApi = <Rq = any, Rp = any>(url: string, option?: Options<Rq>): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		fetchApiCore<Rq, Rp>(url, {
			method: 'post',
			...option,
		})
			.then((res) => {
				resolve(res as NewResponse<Rp>);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

// DELETE 封装
export const fetchDeleteApi = <Rq = any, Rp = any>(url: string, option?: Options<Rq>): Promise<NewResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		fetchApiCore<Rq, Rp>(url, {
			method: 'delete',
			...option,
		})
			.then((res) => {
				resolve(res as NewResponse<Rp>);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
