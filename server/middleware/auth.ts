const whitelist = [
	'/api/user/userPublicQuery',
	'/api/blog/blogPublicQuery',
	'/api/user/user-login',
	'/api/user/user-register',
	'/api/record/recordPublicQuery',
	'/api/record/recordPublicDetail',
	'/api/record/recordPublicDetails',
	'/api/record/recordPublicPic',
];

// 白名单路径模式
const whitelistPatterns = [/^\/api\/blog\/blogPublicDetail(\/\d+)?(\?.*)?$/];

export default defineEventHandler(async (event) => {
	const path = (event.node.req.url || '').split('?')[0];

	// 只处理 /api 开头接口
	if (!path.startsWith('/api')) return;

	// 检查是否白名单
	const isWhitelist = whitelist.includes(path) || whitelistPatterns.some((p) => p.test(path));

	if (isWhitelist) return;

	let realToken = '';
	if (import.meta.server) {
		const token: TokenCookie = parseCookies(event) as any;
		const cookieToken: { token: string } = JSON.parse((token.userState ?? JSON.stringify({})) as unknown as string);
		realToken = cookieToken?.token;
	} else {
		const authHeader = event.node.req.headers['authorization'] as string | undefined;
		realToken = authHeader?.split(' ')[1] ?? '';
	}

	if (!realToken) return sendErrorWithMessage(event, 401, '你还未登录！');

	try {
		const payload = verifyToken(realToken);
		event.context.user = payload;
	} catch {
		return sendErrorWithMessage(event, 401, '登录已失效！');
	}
});
