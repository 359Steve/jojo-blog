export default defineNuxtRouteMiddleware(to => {
	if (!to.query.id) {
		return abortNavigation(
			createError({
				statusCode: 500,
				statusMessage: 'Error',
				data: {
					message: '出错了！'
				}
			})
		);
	}

	return true;
});
