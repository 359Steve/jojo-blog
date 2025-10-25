const whitelist = [
	'/api/user/userPublicQuery',
	'/api/blog/blogPublicQuery',
	'/api/user/user-login',
	'/api/user/user-register',
];

// 白名单路径模式
const whitelistPatterns = [/^\/api\/blog\/blogPublicDetail(\/\d+)?(\?.*)?$/];

export default defineEventHandler((event) => {
	let realToken = '';
	const path = event.node.req.url || '';

	// 去掉携带的参数
	const realPath = path.split('?')[0];

	if (!path.startsWith('/api')) return;

	// 如果是白名单接口，跳过校验
	if (whitelist.includes(realPath)) return;

	// 检查白名单模式
	if (whitelistPatterns.some((pattern) => pattern.test(path))) return;

	if (import.meta.server) {
		const token: TokenCookie = parseCookies(event) as any;
		const cookieToken: { token: string } = JSON.parse((token.userState ?? JSON.stringify({})) as unknown as string);
		realToken = cookieToken?.token;
	} else {
		const authHeader = getHeader(event, 'Authorization');
		realToken = authHeader?.split(' ')[1] ?? '';
	}

	if (!realToken) {
		sendErrorWithMessage(event, 401, '你还未登录！');
	}

	try {
		// 验证token
		const payload = verifyToken(realToken || '');
		event.context.user = payload;
	} catch {
		sendErrorWithMessage(event, 401, '登录已失效！');
	}
});
