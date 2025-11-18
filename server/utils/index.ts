import type { ZodObject } from 'zod';

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
