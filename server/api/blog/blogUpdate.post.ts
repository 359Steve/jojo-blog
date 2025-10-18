import { container } from '~/server/core/container';
import { CreateBlogSchema, type CreateBlogDto } from '~/server/dto/CreateBlogDto';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);
	const body = await readBody<CreateBlogDto>(event);

	const result = validateData(CreateBlogSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		return await blogService.updateBlog(result);
	} catch {
		sendErrorWithMessage(event, 500, '创建失败！');
		return null;
	}
});
