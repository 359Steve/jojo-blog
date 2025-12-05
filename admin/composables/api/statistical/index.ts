import type { StatisticalDto } from '~/server/dto/StatisticalDto';

// 获取全部统计数据
export const getStatisticalAll = async () => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<any, Record<string, StatisticalDto>>('/statistical/statisticalAll'),
	);

	return handleApiResponse(res, false);
};
