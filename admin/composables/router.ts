// 获取路由配置数据
export const getRouterConfig = () => {
	const modules: Record<string, any> = import.meta.glob(['../router/**/*.ts', '!../router/**/remaining.ts'], {
		eager: true
	});
	const routes: RouteConfigsTable[] = [];

	Object.keys(modules).forEach(key => {
		routes.push(modules[key].default);
	});

	return routes.sort((a, b) => a.meta!.rank! - b.meta!.rank!);
};
