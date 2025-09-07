import { container } from "../core/container";
import { CreateTagDto, FindAllReq } from "../dto/CreateTagDto";
import { TagRepository } from "../repositories/TagRepository";

export class TagService {
	private tagRepo: TagRepository
	constructor() {
		// 这里手动获取容器中的依赖
		this.tagRepo = container.get(TagRepository);
	}

	// 查询全部标签
	async findAllTag(query: FindAllReq) {
		return await this.tagRepo.findAllTag(query);
	}

	// 创建标签
	async createTag<T>(body: CreateTagDto): Promise<NitroResponse<T>> {
		return await this.tagRepo.createTag<T>(body);
	}
}
