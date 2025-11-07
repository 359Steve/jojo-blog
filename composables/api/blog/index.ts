import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

// 查询博客数据
export const getPublicBlogList = chooseCondition<
	FindBlogParams,
	{ records: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]; total: number }
>('/blog/blogPublicQuery');

// 查询博客详情
export const getPublicBlogDetail = (id: number) =>
	chooseCondition<null, BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>>(`/blog/blogPublicDetail/${id}`)();
