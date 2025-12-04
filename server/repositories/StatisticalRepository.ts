import type { PrismaClient } from '@prisma/client';
import { prisma } from '../core/prisma';
import type { StatisticalDto } from '../dto/StatisticalDto';
import { StatusCode } from '~/types/com-types';

export class StatisticalRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 获取全部统计数据
	async getStatisticalAll() {
		try {
			const statsConfig = await this.prismaClient.$transaction(async (tx) => {
				const configData: StatsConfig[] = [
					{
						key: 'SuggestionList',
						type: 'SuggestionList',
						total: await tx.error_report.count(),
						today: await tx.error_report.count({ where: { created_at: { gte: getDay('today') } } }),
					},
					{
						key: 'BlogList',
						type: 'BlogList',
						total: (await tx.blog.aggregate({ _sum: { views: true } }))._sum.views || 0,
						today:
							(
								await tx.blog_views_daily.aggregate({
									_sum: { views: true },
									where: { view_date: getDay('today') },
								})
							)._sum.views || 0,
					},
					{
						key: 'RecordList',
						type: 'RecordList',
						total: (await tx.record_details.aggregate({ _sum: { views: true } }))._sum.views || 0,
						today:
							(
								await tx.record_details_views_daily.aggregate({
									_sum: { views: true },
									where: { view_date: getDay('today') },
								})
							)._sum.views || 0,
					},
				];

				return configData;
			});

			const cout: Record<string, StatisticalDto> = {};

			for (const stat of statsConfig) {
				cout[stat.key] = {
					type: stat.type,
					value: stat.total,
					increment: stat.today,
				};
			}

			return returnData(StatusCode.SUCCESS, '获取统计数据成功', cout);
		} catch (error) {
			return returnData(StatusCode.FAIL, '获取统计数据失败', null);
		}
	}
}
