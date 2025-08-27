import { StatusCode } from "~/types/com-types";

export default defineEventHandler(async (event): Promise<NitroResponse<any>> => {
	const { token } = await readBody<{ token: string }>(event);

	try {
		verifyToken(token);
		return {
			code: StatusCode.SUCCESS,
			msg: '验证成功！',
			data: null
		};
	} catch (error) {
		return {
			code: StatusCode.FAIL,
			msg: '验证失败！',
			data: null
		};
	}
})
