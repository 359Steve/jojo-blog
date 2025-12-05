import { container } from '~/server/core/container';
import type { StatisticalService } from '~/server/services/Statistical';
import { STATISTICAL_SERVICE } from '~/server/services/Statistical';

export default defineEventHandler(async (event) => {
	const date = new Date();
	const { type = 'blog', year = date.getFullYear(), month = date.getMonth() + 1 } = getQuery<BlogViewsQuery>(event);

	try {
		const statisticalAllService = container.get<StatisticalService>(STATISTICAL_SERVICE);
		return await statisticalAllService.getBlogOrRecordViews({
			type,
			year,
			month,
		});
	} catch {
		sendErrorWithMessage(event, 500, '获取博客访问量数据失败');
		return null;
	}
});
