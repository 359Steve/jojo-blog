import { container } from '../core/container';
import { MdRepository } from '../repositories/MdRepository';

export class MdService {
	private mdRepo: MdRepository;

	constructor() {
		this.mdRepo = container.get(MdRepository);
	}

	// 上传图片
	async uploadImage(files: ReturnFunction<typeof readMultipartFormData>, datePath: string) {
		return await this.mdRepo.uploadImage(files, datePath);
	}

	// 删除指定目录下的图片
	async deleteMdPicture(picPath: string, fileNames: string[]) {
		return await this.mdRepo.deleteMdPicture(picPath, fileNames);
	}
}
