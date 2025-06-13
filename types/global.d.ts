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
}

export { };
