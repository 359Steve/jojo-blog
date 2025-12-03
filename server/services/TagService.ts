import type { CreateTagDto } from '../dto/CreateTagDto';
import type { TagRepository } from '../repositories/TagRepository';

export const TAG_SERVICE = Symbol('TagService');
export interface TagService {
	// 查询全部标签
	findAllTag(query: FindAllReq): ReturnType<TagRepository['findAllTag']>;
	// 分类型查询标签
	findTag(query: FindReq): ReturnType<TagRepository['findTag']>;
	// 创建标签
	createTag(body: CreateTagDto): ReturnType<TagRepository['createTag']>;
	// 修改标签
	updateTag(body: Partial<CreateTagDto>): ReturnType<TagRepository['updateTag']>;
	// 删除标签
	deleteTag(id: number): ReturnType<TagRepository['deleteTag']>;
}
