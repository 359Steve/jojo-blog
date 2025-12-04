import type { StatusCode } from '~/types/com-types';

export const returnData = <T>(code: StatusCode, msg: string, data: T | null): NitroResponse<T> => {
	return { code, msg, data };
};

export const getDay = (type: 'today' | 'yesterday' | 'tomorrow') => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const date = now.getDate();

	// 获取当天日期的 UTC 时间
	const today = new Date(Date.UTC(year, month, date, 0, 0, 0));
	switch (type) {
		case 'today':
			return today;
		case 'yesterday':
			return new Date(today.getTime() - 24 * 60 * 60 * 1000);
		default:
			return today;
	}
};
