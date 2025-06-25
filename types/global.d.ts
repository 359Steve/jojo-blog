declare module 'esbuild-plugin-decorators';

declare global {
	interface JoJoResponse<T> {
		code: number;
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
