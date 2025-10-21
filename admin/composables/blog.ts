import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { BlogTagDto } from '~/server/dto/CreateBlogTagDto';

export const useBlog = defineStore('useBlog', () => {
	const currentBlog = ref<BlogWithTagsRep<CreateBlogDto, BlogTagDto, 'tags'> | null>(null);

	const setCurrentBlog = (blog: BlogWithTagsRep<CreateBlogDto, BlogTagDto, 'tags'> | null) => {
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
