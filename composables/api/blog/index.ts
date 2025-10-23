import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

// 查询博客数据
export const getPublicBlogList = async (data: FindBlogParams) => {
	const res = await jojoLoadingIndicator(() => {
		if (import.meta.server) {
			return useGet<
				FindBlogParams,
				{ records: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]; total: number }
			>('/blog/blogPublicQuery', {
				query: data,
			});
		}
		return fetchUseGet<
			FindBlogParams,
			{ records: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]; total: number }
		>('/blog/blogPublicQuery', {
			query: data,
		});
	});

	return handleApiResponse(res);
};
