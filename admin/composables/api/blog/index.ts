import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

// 创建博客
export const createBlog = async (data: CreateBlogDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateBlogDto, CreateBlogDto>('/blog/blogCreate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 查询博客列表
export const getBlogList = async (data: FindBlogParams) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<FindBlogParams, { records: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]; total: number }>(
			'/blog/blogList',
			{
				query: data,
			},
		),
	);

	return handleApiResponse(res, false);
};

// 删除博客
export const deleteBlog = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<{ id: number }, CreateBlogDto>('/blog/blogDelete', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};

// 根据ID获取单个博客
export const getBlogById = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<{ id: number }, BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>>('/blog/blogQueryById', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};

// 更新博客
export const updateBlog = async (data: CreateBlogDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateBlogDto, BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>>('/blog/blogUpdate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 上传博客封面
export const uploadBlogCover = async (formData: FormData) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<FormData, { url: string }>('/blog/blogUpload', {
			body: formData,
		}),
	);

	return handleApiResponse(res);
};
