import type Redis from 'ioredis';
import type { StatusCode } from '~/types/com-types';
import fs from 'fs/promises';
import { join } from 'path';
import pLimit from 'p-limit';

export const limit = pLimit(2);

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

export const collectDirsFromUrls = (urls: string[]) => {
	const dirs = new Set<string>();

	for (const url of urls) {
		const match = url.match(/\/recorddetail\/([^/]+)\/(p-[^/]+)\//);
		if (!match) continue;

		const [, datePath, pDir] = match;

		dirs.add(join(process.cwd(), 'file-system', 'recorddetail', datePath, pDir));
	}

	return Array.from(dirs);
};

export const deleteDirsAsync = async (dirs: string[]) => {
	for (const dir of dirs) {
		try {
			await fs.rm(dir, { recursive: true, force: true });
		} catch (e) {
			console.error('删除目录失败:', dir, e);
		}
	}
};

export const processGroup = async (group: FileGroup, baseUploadDir: string, datePath: string) => {
	const heicFile = group.files.find((f) => f.extension === 'heic');
	const movFile = group.files.find((f) => f.extension === 'mov');
	const isLivePhoto = !!heicFile && !!movFile;

	let groupDate = new Date();
	const imageFile = group.files.find((f) => ['heic', 'jpg', 'jpeg', 'png', 'gif', 'webp'].includes(f.extension));
	if (imageFile) {
		groupDate = await extractExifDate(imageFile.data);
	}

	const base = `p-${groupDate.toISOString().replace(/[:.a-z]+/gi, '-')}`;
	const groupDir = join(baseUploadDir, base);
	await fs.mkdir(groupDir, { recursive: true });

	const baseUrl = `/recorddetail/${datePath}/${base}`;

	if (isLivePhoto) {
		const url = await processLivePhoto(heicFile.data, movFile.data, groupDir, baseUrl, base);
		return [{ url, is_live: true }];
	}

	const results = [];

	for (const file of group.files) {
		if (file.extension === 'heic') {
			const url = await processHeicToPng(file.data, groupDir, baseUrl, base);
			results.push({ url, is_live: false });
		} else {
			const url = await processImageInSubDir(file.data, file.filename, groupDir, baseUrl, base);
			results.push({ url, is_live: false });
		}
	}

	return results;
};
