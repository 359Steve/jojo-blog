import type { StatisticalRepository } from '../repositories/StatisticalRepository';
import type { StatisticalService } from '../services/Statistical';

export class StatisticalServiceImpl implements StatisticalService {
	private statisticalRepository: StatisticalRepository;

	constructor(statisticalRepository: StatisticalRepository) {
		this.statisticalRepository = statisticalRepository;
	}
	getBlogOrRecordViews(query: BlogViewsQuery) {
		return this.statisticalRepository.getBlogOrRecordViews(query);
	}

	// 获取全部统计数据
	getStatisticalAll() {
		return this.statisticalRepository.getStatisticalAll();
	}
}
