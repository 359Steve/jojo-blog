import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

export const useBlog = defineStore('useBlog', () => {
	const currentBlog = ref<BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'> | null>(null);

	const setCurrentBlog = (blog: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'> | null) => {
		currentBlog.value = blog;
	};

	const getCurrentBlog = () => {
		return currentBlog.value;
	};

	const resetCurrentBlog = () => {
		currentBlog.value = null;
	};

	return {
		currentBlog,
		setCurrentBlog,
		getCurrentBlog,
		resetCurrentBlog,
	};
});
