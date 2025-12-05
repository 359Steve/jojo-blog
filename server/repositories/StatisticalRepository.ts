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

	// 获取博客访问量
	async getBlogOrRecordViews(query: BlogViewsQuery) {
		const { type, year, month } = query;
		try {
			const numDays = new Date(year, month, 0).getDate();
			const startDate = new Date(year, month - 1, 1);
			const endDate = new Date(year, month, 0);

			const whereClause = {
				select: {
					view_date: true,
					views: true,
				},
				where: {
					view_date: {
						gte: startDate,
						lte: endDate,
					},
				},
			};

			const blogViewsRaw =
				type === 'blog'
					? await this.prismaClient.blog_views_daily.findMany(whereClause)
					: await this.prismaClient.record_details_views_daily.findMany(whereClause);

			const viewsMap = new Map<string, number>();
			for (const item of blogViewsRaw) {
				const day = new Date(item.view_date).getDate();
				if (viewsMap.has(day.toString())) {
					viewsMap.set(day.toString(), viewsMap.get(day.toString())! + (item.views ?? 0));
				} else {
					viewsMap.set(day.toString(), item.views ?? 0);
				}
			}

			const blogViews = Array.from(viewsMap, ([day, views]) => ({
				view_date: new Date(year, month - 1, Number(day)),
				views,
			}));
			const dayViews = Array(numDays).fill(0);

			for (const item of blogViews) {
				const day = new Date(item.view_date).getDate();
				dayViews[day - 1] = item.views ?? 0;
			}

			return returnData(StatusCode.SUCCESS, '获取博客访问量成功', dayViews);
		} catch (error) {
			return returnData(StatusCode.FAIL, '获取博客访问量失败', null);
		}
	}
}
