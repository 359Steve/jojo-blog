import { StatusCode } from '~/types/com-types';
import type { NitroFetchOptions } from 'nitropack';

// 加载静态图片资源
export const useLoadStaticImage = async (url: string | number): Promise<string> => {
	const res: StaticImage = await import(`~/assets/image/${url}.png`);
	return res.default;
};

// 判断设备型号
export const detectDeviceDetail = (): {
	type: 'mobile' | 'tablet' | 'desktop';
	model: string;
} => {
	const ua = navigator.userAgent;

	// Apple 设备
	if (/iPhone/.test(ua)) return { type: 'mobile', model: 'iPhone' };
	if (/iPad/.test(ua)) return { type: 'tablet', model: 'iPad' };
	if (/Macintosh/.test(ua)) return { type: 'desktop', model: 'Mac' };

	// Android 设备
	if (/Android/.test(ua)) {
		// 判断手机和平板
		const isMobile = /Mobile/.test(ua);
		const modelMatch = ua.match(/Android.*;\s([^;)]*)/);
		const model = modelMatch ? modelMatch[1].trim() : 'Android Device';
		return {
			type: isMobile ? 'mobile' : 'tablet',
			model,
		};
	}

	// Windows PC
	if (/Windows/.test(ua)) return { type: 'desktop', model: 'Windows PC' };

	// Linux 桌面
	if (/Linux/.test(ua)) return { type: 'desktop', model: 'Linux' };

	// 默认未知设备
	return { type: 'desktop', model: 'Unknown Device' };
};

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
) => {
	return async (data?: Req) => {
		const res = await jojoLoadingIndicator(() => {
			if (import.meta.server) {
				switch (method) {
					case 'GET':
						return useGet<Req, Rep>(endpoint, { query: data });
					case 'POST':
						return postApi<Req, Rep>(endpoint, { body: data });
					case 'DELETE':
						return deleteApi<Req, Rep>(endpoint, { body: data });
					default:
						return useGet<Req, Rep>(endpoint, { query: data });
				}
			} else {
				switch (method) {
					case 'GET':
						return fetchUseGet<Req, Rep>(endpoint, { query: data });
					case 'POST':
						return fetchPostApi<Req, Rep>(endpoint, { body: data });
					case 'DELETE':
						return fetchDeleteApi<Req, Rep>(endpoint, { body: data });
					default:
						return fetchUseGet<Req, Rep>(endpoint, { query: data });
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
