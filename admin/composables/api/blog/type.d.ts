interface FindBlogParams {
	pageNumber: number;
	pageSize: number;
	keyword?: string;
}

// 博客标签复合返回值
interface BlogWithTagsDto<T> {
	blog_id: number;
	tag: T[];
	tag_id: number;
}

type BlogWithTagsRep<T, P, K> = Omit<T, K> & {
	tags: BlogWithTagsDto<P>[];
};
