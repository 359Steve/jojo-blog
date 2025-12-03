import type { TagService } from '../services/TagService';
import type { CreateTagDto } from '../dto/CreateTagDto';
import type { TagRepository } from '../repositories/TagRepository';

export class TagServiceImpl implements TagService {
	private tagRepository: TagRepository;

	constructor(tagRepository: TagRepository) {
		this.tagRepository = tagRepository;
	}

	findAllTag(query: FindAllReq): ReturnType<TagRepository['findAllTag']> {
		return this.tagRepository.findAllTag(query);
	}
	findTag(query: FindReq): ReturnType<TagRepository['findTag']> {
		return this.tagRepository.findTag(query);
	}
	createTag(body: CreateTagDto): ReturnType<TagRepository['createTag']> {
		return this.tagRepository.createTag(body);
	}
	updateTag(body: Partial<CreateTagDto>): ReturnType<TagRepository['updateTag']> {
		return this.tagRepository.updateTag(body);
	}
	deleteTag(id: number): ReturnType<TagRepository['deleteTag']> {
		return this.tagRepository.deleteTag(id);
	}
}
