import { StatusCode } from '~/types/com-types';

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
const whitelistPatterns = [
	/^\/api\/blog\/blogPublicDetail(\/\d+)?(\?.*)?$/,
	/^\/api\/blog\/blogAddView(\/\d+)?(\?.*)?$/,
	/^\/api\/record\/detail\/detailAddView(\/\d+)?(\?.*)?$/,
];

export default defineEventHandler(async (event) => {
	const path = (event.node.req.url || '').split('?')[0];

	if (!path.startsWith('/api')) return;

	const isWhitelist = whitelist.includes(path) || whitelistPatterns.some((p) => p.test(path));

	if (isWhitelist) {
		if (event.node.req.headers['authorization']) {
			delete event.node.req.headers['authorization'];
		}
		return;
	}

	let realToken = '';
	if (import.meta.server) {
		const token: TokenCookie = parseCookies(event) as any;
		const cookieToken: { token: string } = JSON.parse((token.userState || JSON.stringify({})) as unknown as string);
		realToken = cookieToken?.token || '';
	} else {
		const authHeader = event.node.req.headers['authorization'] as string | undefined;
		realToken = authHeader?.split(' ')[1] || '';
	}

	if (!realToken) return sendErrorWithMessage(event, StatusCode.UNAUTHORIZED, '你还未登录！');

	try {
		const payload = verifyToken(realToken);
		event.context.user = payload;
	} catch {
		return sendErrorWithMessage(event, StatusCode.UNAUTHORIZED, '登录已失效！');
	}
});
