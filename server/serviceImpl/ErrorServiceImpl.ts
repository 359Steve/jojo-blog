import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import type { ErrorRepository } from '../repositories/ErrorRepository';
import type { ErrorService } from '../services/ErrorService';

export class ErrorServiceImpl implements ErrorService {
	private errorRepository: ErrorRepository;

	constructor(errorRepository: ErrorRepository) {
		this.errorRepository = errorRepository;
	}

	sendErrorEmail(errorInfo: CreateErrorMessageDto): ReturnType<ErrorRepository['sendErrorEmail']> {
		return this.errorRepository.sendErrorEmail(errorInfo);
	}
}
