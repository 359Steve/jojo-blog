import type { ZodObject } from 'zod';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'node:fs';

const findOutputPublicDir = (startDir: string): string => {
	let dir = startDir;

	while (dir !== '/') {
		const candidate = join(dir, '.output/public');
		if (fs.existsSync(candidate)) {
			return candidate;
		}
		dir = dirname(dir);
	}

	throw new Error('Cannot find .output/public directory');
};

export const validateData = <T>(schema: ZodObject, data: T, onError: (value: string) => void): T => {
	const result = schema.safeParse(data);
	if (!result.success) {
		// 获取所有错误信息
		onError(
			result.error.issues
				.map((error) => error.message)
				.filter(Boolean)
				.join('; '),
		);
	}

	return result.data as T; // 校验通过的数据
};

export const getPublicDir = (): string => {
	// 当前执行文件所在目录
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	// 生产环境
	if (process.env.NODE_ENV === 'production') {
		return findOutputPublicDir(__dirname);
	}

	// 开发环境
	return join(process.cwd(), 'public');
};
