import type { StatisticalRepository } from '../repositories/StatisticalRepository';

export const STATISTICAL_SERVICE = Symbol('StatisticalService');
export interface StatisticalService {
	// 获取全部统计数据
	getStatisticalAll(): ReturnType<StatisticalRepository['getStatisticalAll']>;
}
