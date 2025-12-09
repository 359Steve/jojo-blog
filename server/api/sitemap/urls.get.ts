import { asSitemapUrl, defineSitemapEventHandler } from '#imports';
import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineSitemapEventHandler(async (e) => {
	const routes = [
		asSitemapUrl({ loc: '/', changefreq: 'daily', priority: 1, lastmod: new Date() }),
		asSitemapUrl({ loc: '/blog', changefreq: 'daily', priority: 0.9, lastmod: new Date() }),
		asSitemapUrl({ loc: '/record', changefreq: 'daily', priority: 0.9, lastmod: new Date() }),
		asSitemapUrl({ loc: '/photos', changefreq: 'weekly', priority: 0.8, lastmod: new Date() }),
	];

	try {
		// 获取博客列表
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);

		const [blogsResponse, recordsResponse] = await Promise.all([
			blogService.getBlogList({
				pageNumber: 1,
				pageSize: -1,
			}),
			recordDetailService.getPublicRecordDetails(),
		]);

		if (blogsResponse?.data?.records) {
			blogsResponse.data.records.forEach((blog) => {
				routes.push(
					asSitemapUrl({
						loc: `/blog/detail/${blog.id}`,
						changefreq: 'monthly',
						priority: 0.7,
						lastmod: blog.updated_at ? new Date(blog.updated_at) : new Date(),
					}),
				);
			});
		}

		if (recordsResponse?.data?.records) {
			recordsResponse.data.records.forEach((record) => {
				routes.push(
					asSitemapUrl({
						loc: `/record/detail/${record.group_id}/${record.id}`,
						changefreq: 'monthly',
						priority: 0.7,
						lastmod: record.updated_at ? new Date(record.updated_at) : new Date(),
					}),
				);
			});
		}
	} catch (error) {
		return routes;
	}

	return routes;
});
