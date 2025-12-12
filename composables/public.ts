import { StatusCode } from '~/types/com-types';
import type { NitroFetchOptions } from 'nitropack';

export const normalizePath = (path: string) => path.replace(/\/$/, '');

export const exceptPath = (path: string) => path.replace(/\/\d+$/, '');

// 封装box确认弹窗
export const useConfirm = (
	message: string,
	type: 'warning' | 'success' | 'info' | 'error' = 'warning',
	onConfirm: () => void,
	onCancel?: () => void,
) => {
	ElMessageBox.confirm(message, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type,
	})
		.then(() => {
			onConfirm();
		})
		.catch(() => {
			onCancel && onCancel();
		});
};

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

// 封装useLoadingIndicator
export const jojoLoadingIndicator = async <T>(fn: () => Promise<T>): Promise<T> => {
	const { start, finish } = useLoadingIndicator();

	start();
	try {
		const result = await fn();
		finish();
		return result;
	} finally {
		finish();
	}
};

// 封装请求返回方法
export const handleApiResponse = <T>(
	res: NewResponse<T>,
	showMessage: boolean = true,
): { data: T | null; msg: string } => {
	if (res?.code === StatusCode.SUCCESS) {
		if (showMessage) {
			ElMessage.success(res.msg);
		}
		return {
			data: res.data,
			msg: res.msg,
		};
	}

	return {
		data: null,
		msg: res?.msg || '请求失败',
	};
};

// 封装不同环境请求
export const chooseCondition = <Req extends Record<string, any>, Rep>(
	endpoint: string,
	method: Options<NitroFetchOptions<string>, Req>['method'] = 'GET',
	headers?: Options<NitroFetchOptions<string>, Req>['headers'],
) => {
	return async (data?: Req) => {
		const res = await jojoLoadingIndicator(() => {
			if (import.meta.server) {
				switch (method) {
					case 'GET':
						return useGet<Req, Rep>(endpoint, { query: data, headers });
					case 'POST':
						return postApi<Req, Rep>(endpoint, { body: data, headers });
					case 'DELETE':
						return deleteApi<Req, Rep>(endpoint, { body: data, headers });
					case 'PUT':
						return putApi<Req, Rep>(endpoint, { body: data, headers });
					default:
						return useGet<Req, Rep>(endpoint, { query: data, headers });
				}
			} else {
				switch (method) {
					case 'GET':
						return fetchUseGet<Req, Rep>(endpoint, { query: data, headers });
					case 'POST':
						return fetchPostApi<Req, Rep>(endpoint, { body: data, headers });
					case 'DELETE':
						return fetchDeleteApi<Req, Rep>(endpoint, { body: data, headers });
					case 'PUT':
						return fetchPutApi<Req, Rep>(endpoint, { body: data, headers });
					default:
						return fetchUseGet<Req, Rep>(endpoint, { query: data, headers });
				}
			}
		});

		return handleApiResponse(res, false);
	};
};

export const getDatePath = (): string => {
	const date = new Date();
	return (
		`${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}` +
		`-${date.getHours().toString().padStart(2, '0')}` +
		`${date.getMinutes().toString().padStart(2, '0')}` +
		`${date.getSeconds().toString().padStart(2, '0')}`
	);
};

export const monthArrData = (year: number = new Date().getFullYear()) => {
	const monthArr = [];

	for (let i = 1; i <= 12; i++) {
		const numDays = new Date(year, i, 0).getDate();
		const monthObj = {
			month: i,
			name: `${i}月`,
			monthDayList: Array.from({ length: numDays }, (_, n) => ({
				day: n + 1,
			})),
		};
		monthArr.push(monthObj);
	}

	return monthArr;
};
