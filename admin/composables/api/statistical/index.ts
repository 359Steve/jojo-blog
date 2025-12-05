import type { StatisticalDto } from '~/server/dto/StatisticalDto';

// 获取全部统计数据
export const getStatisticalAll = async () => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<any, Record<string, StatisticalDto>>('/statistical/statisticalAll'),
	);

	return handleApiResponse(res, false);
};

// 获取浏览量统计数据
export const getViewsStatistical = async (query: BlogViewsQuery) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<BlogViewsQuery, number[]>('/statistical/blogOrRecordViews', {
			query,
		}),
	);

	return handleApiResponse(res, false);
};
