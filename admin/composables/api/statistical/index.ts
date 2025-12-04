import type { StatisticalDto } from '~/server/dto/StatisticalDto';

export const getStatisticalAll = async () => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<any, Record<string, StatisticalDto>>('/statistical/statisticalAll'),
	);

	return handleApiResponse(res, false);
};
