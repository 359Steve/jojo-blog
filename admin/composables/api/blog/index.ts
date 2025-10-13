import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';

// 创建博客
export const createBlog = async (data: CreateBlogDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateBlogDto, CreateBlogDto>('/blog/blogCreate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};
