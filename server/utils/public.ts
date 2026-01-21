import type Redis from 'ioredis';
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

// 封装redis自动存储到期时间函数
export const setRedisWithExpire = async (redisClient: Redis, key: string, value: string) => {
	const now = new Date();
	const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
	const secondsUntilEndOfToday = Math.floor((endOfToday.getTime() - now.getTime()) / 1000);

	await redisClient.set(key, value, 'EX', secondsUntilEndOfToday);
};

// 辅助函数：提取文件基名（不含扩展名）
export const getFileStem = (filename: string): string => {
	const lastDot = filename.lastIndexOf('.');
	return lastDot > 0 ? filename.slice(0, lastDot) : filename;
};
