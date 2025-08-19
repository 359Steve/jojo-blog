import type { StatusCode } from '~/types/com-types';

declare module 'esbuild-plugin-decorators';

declare global {
	// 请求返回值类型
	declare interface NitroResponse<T> {
		code: StatusCode;
		msg: string;
		data: T | null;
	}

	interface TokenCookie {
		userState: {
			token: string;
		};
		token: string;
	}

	interface Meta {
		charset?: string;
		name?: string;
		content?: string;
		hid?: string;
		[key: string]: any;
	}
}

export { };
