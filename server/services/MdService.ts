import { container } from '../core/container';
import { MdRepository } from '../repositories/MdRepository';

export class MdService {
	private mdRepo: MdRepository;

	constructor() {
		this.mdRepo = container.get(MdRepository);
	}

	// 上传图片
	async uploadImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		return await this.mdRepo.uploadImage(files);
	}
}
