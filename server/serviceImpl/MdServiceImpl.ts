import type { MdRepository } from '../repositories/MdRepository';
import type { MdService } from '../services/MdService';

export class MdServiceImpl implements MdService {
	private mdRepository: MdRepository;

	constructor(mdRepository: MdRepository) {
		this.mdRepository = mdRepository;
	}

	uploadImage(
		files: ReturnFunction<typeof readMultipartFormData>,
		datePath: string,
	): ReturnType<MdRepository['uploadImage']> {
		return this.mdRepository.uploadImage(files, datePath);
	}
	deleteMdPicture(picPath: string, fileNames: string[]): ReturnType<MdRepository['deleteMdPicture']> {
		return this.mdRepository.deleteMdPicture(picPath, fileNames);
	}
}
