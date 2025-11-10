import { container } from '../core/container';
import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import { ErrorRepository } from '../repositories/ErrorRepository';

export class ErrorService {
	private errorRepo: ErrorRepository;
	constructor() {
		this.errorRepo = container.get(ErrorRepository);
	}

	// 发送邮件
	async sendErrorEmail(errorInfo: CreateErrorMessageDto) {
		return await this.errorRepo.sendErrorEmail(errorInfo);
	}
}
