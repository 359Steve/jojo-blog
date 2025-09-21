import { container } from '../core/container';
import type { CreateTagDto } from '../dto/CreateTagDto';
import { TagRepository } from '../repositories/TagRepository';

export class TagService {
	private tagRepo: TagRepository;
	constructor() {
		// 这里手动获取容器中的依赖
		this.tagRepo = container.get(TagRepository);
	}

	// 查询全部标签
	async findAllTag(query: FindAllReq) {
		return await this.tagRepo.findAllTag(query);
	}

	// 分类型查询标签
	async findTag(query: FindReq) {
		return await this.tagRepo.findTag(query);
	}

	// 创建标签
	async createTag(body: CreateTagDto) {
		return await this.tagRepo.createTag(body);
	}

	// 修改标签
	async updateTag(body: CreateTagDto) {
		return await this.tagRepo.updateTag(body);
	}

	// 删除标签
	async deleteTag(id: number) {
		return await this.tagRepo.deleteTag(id);
	}
}
