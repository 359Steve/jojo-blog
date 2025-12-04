import { container } from '~/server/core/container';
import type { StatisticalService } from '~/server/services/Statistical';
import { STATISTICAL_SERVICE } from '~/server/services/Statistical';

export default defineEventHandler(async (event) => {
	try {
		const statisticalAllService = container.get<StatisticalService>(STATISTICAL_SERVICE);
		return await statisticalAllService.getStatisticalAll();
	} catch {
		sendErrorWithMessage(event, 500, '获取统计数据失败');
		return null;
	}
});
