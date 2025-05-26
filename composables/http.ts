type Method = 'get' | 'post' | 'put' | 'delete'
// 自定义 Options 类型
type Options<T> = {
	baseURL?: string
	method?: Method
	body?: T
	query?: T
	params?: T
	headers?: Record<string, string>
	[key: string]: any
}
// 响应基本信息类型
type BaseResponse<T> = {
	code: number
	msg: string
	data: T
	[key: string]: any
}

export const apiCore = <Rq = any, Rp = any>(url: string, option: Options<Rq | any>) => {
	// 获取全局变量
	const appConfig = useAppConfig()
	// 获取nuxtApp实例
	const nuxtApp = useNuxtApp()
	// 获取token
	// const token: string = useUserState().getToken() || ''
	// 生成唯一的key
	const key = url + btoa(decodeURIComponent(JSON.stringify({
		...(option?.params || {}),
		...(option?.query || {})
	})));

	return useFetch<BaseResponse<Rp>>(url, {
		baseURL: appConfig.baseUrl,
		key,
		method: option?.method as any,
		...option,

		// 设置请求拦截
		onRequest({ options }) {
			options.headers = {
				// Authorization: `Bearer ${token}`,
				...options.headers
			} as Headers & { Authorization?: string }
		},

		// 响应拦截
		onResponse({ response }) {
			if (!response.ok) return
			const data = response._data as BaseResponse<Rp>
			if (data.code !== 200) {
				if (import.meta.client) {
					// 直接提示错误信息
					ElMessage({
						type: 'error',
						message: data.msg || '请求出错！'
					})
				} else {
					// 跳转错误页面
					nuxtApp.runWithContext(() => {
						navigateTo({
							path: '/pageError',
							query: {
								code: data.code,
								msg: data.msg || '请求出错！'
							}
						})
					})
				}
			}
		},

		// 响应失败
		onResponseError({ response }) {
			const data = response._data as BaseResponse<Rp>
			// 如果是客户端直接提示错误信息
			if (import.meta.client) {
				ElMessage({
					type: 'error',
					message: data.msg || '请求出错！'
				})
			} else {
				// 跳转错误页面
				nuxtApp.runWithContext(() => {
					navigateTo({
						path: '/pageError',
						query: {
							code: data.code,
							msg: data.msg || '请求出错！'
						}
					})
				})
			}
		}
	})
}

// GET请求封装
export const useGet = <Rq = any, Rp = any>(url: string, option: Options<Rq> = {}): Promise<BaseResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'get',
			...option
		}).then(res => {
			resolve(res.data.value as BaseResponse<Rp>)
		}).catch(err => {
			reject(err)
		})
	})
}

// POST 封装
export const postApi = <Rq = any, Rp = any>(url: string, option?: Options<Rq>): Promise<BaseResponse<Rp>> => {
	return new Promise((resolve, reject) => {
		apiCore<Rq, Rp>(url, {
			method: 'post',
			...option
		}).then(res => {
			resolve(res.data.value as BaseResponse<Rp>)
		}).catch(err => {
			reject(err)
		})
	})
}
