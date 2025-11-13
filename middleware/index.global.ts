let scrollWatcherCreated = false;
let scrollWatcher: ReturnType<typeof watch> | null = null;

export default defineNuxtRouteMiddleware((to, from) => {
	const { menuList, menuId } = storeToRefs(useJojoHeader());

	if (to.path === '/record/home') {
		if (scrollWatcher) {
			scrollWatcher();
			scrollWatcher = null;
		}
	} else if (from?.path === '/record/home' && !to.path.startsWith('/admin')) {
		if (!scrollWatcher) {
			const { y } = useWindowScroll();
			scrollWatcher = watch(
				y,
				(newY, oldY) => {
					useJojoHeader().setScroll(newY > (oldY ?? 0) && newY > useJojoHeader().getHeaderHeight());
				},
				{ immediate: true },
			);
		}
	} else if (!to.path.startsWith('/admin') && to.path !== '/record/home') {
		if (!scrollWatcherCreated && !scrollWatcher) {
			const { y } = useWindowScroll();
			scrollWatcher = watch(
				y,
				(newY, oldY) => {
					useJojoHeader().setScroll(newY > (oldY ?? 0) && newY > useJojoHeader().getHeaderHeight());
				},
				{ immediate: true },
			);
			scrollWatcherCreated = true;
		}
	}

	if (to.path === '/') {
		menuId.value = 1;
		return true;
	} else {
		to.path = normalizePath(to.path);
		const path = to.path;

		// 优先匹配最长的路径（避免 / 匹配到所有路径）
		const matched = menuList.value
			.filter((item) => path === item.path || path.startsWith(`${item.path}/`))
			.sort((a, b) => b.path.length - a.path.length)[0];

		menuId.value = matched ? matched.id : 0;
	}

	return true;
});
