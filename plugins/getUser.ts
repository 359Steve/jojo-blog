export default defineNuxtPlugin({
	name: 'getUser',
	parallel: true,
	async setup() {
		const route = useRoute();
		if (!route.path.startsWith('/admin')) {
			const { data } = await useAsyncData('user', () => findPublicUser());
			if (data.value?.data) {
				useBlogUserInfo().setBlogUserInfo(data.value.data);
			} else {
				throw createError({
					statusCode: 500,
					message: '获取用户信息失败！',
				});
			}
		}
	},
});
