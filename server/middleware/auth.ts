// 白名单接口路径（可用通配符逻辑）
const whitelist = ['/api/user', '/api/user-login'];

// token认证中间件
export default defineEventHandler(event => {
	const path = event.node.req.url || '';
	const authHeader = getHeader(event, 'Authorization');

	if (!path.startsWith('/api')) return;

	// 如果是白名单接口，跳过校验
	if (whitelist.includes(path)) return;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: '你还未登录！'
			})
		);
	}

	const token = authHeader?.split(' ')[1];

	try {
		// 验证token
		const payload = verifyToken(token || '');
		event.context.user = payload;
	} catch {
		sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: '登录已失效！'
			})
		);
	}
});
