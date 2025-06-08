import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

export default defineEventHandler(async event => {
	// 获取query参数
	const { id } = getQuery<{ id: number }>(event);
	const db = getDb();

	// 查询用户信息
	const result = await db.user_info.findUnique({
		where: {
			id: Number(id)
		}
	});

	if (result) {
		const { describe } = result;
		// 读取文件
		const filePath = join(process.cwd(), 'public/file', `${describe}.txt`);
		const content = await readFile(filePath, 'utf-8');
		return {
			code: 200,
			msg: 'ok',
			data: {
				content
			}
		};
	}

	return {
		code: 500,
		msg: '查询失败',
		data: null
	};
});
