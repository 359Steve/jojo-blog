export default defineNuxtPlugin({
	name: 'getUser',
	parallel: true,
	async setup() {
		const { data } = await useAsyncData('user', () => findPublicUser());
		if (data.value?.data) {
			useBlogUserInfo().setBlogUserInfo(data.value.data);
		}
	},
});
