import type { PrismaClient, user_info } from '@prisma/client';
import { getDb } from '~/server/utils/db';

export default defineEventHandler(async event => {
	// 获取body
	const { user_name, password, avatar_url, pet_name } = await readBody<user_info>(event);
	const db: PrismaClient = getDb();
	const res = await db.user_info.create({
		data: {
			user_name,
			password,
			avatar_url,
			pet_name
		}
	});
	const result_ok = {
		code: 200,
		msg: 'ok',
		data: res
	};

	const result_error = {
		code: 500,
		msg: '注册失败',
		data: null
	};

	return res ? result_ok : result_error;
});
