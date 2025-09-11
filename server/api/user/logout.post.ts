import { StatusCode } from "~/types/com-types";

export default defineEventHandler((event): NitroResponse<any> => {
	try {
		deleteCookie(event, 'userState');

		return {
			code: StatusCode.SUCCESS,
			msg: '退出成功！',
			data: null
		};
	} catch (error) {
		return {
			code: StatusCode.FAIL,
			msg: '退出失败！',
			data: null
		};
	}
})
