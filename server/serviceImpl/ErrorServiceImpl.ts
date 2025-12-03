import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import type { ErrorRepository } from '../repositories/ErrorRepository';
import type { ErrorService } from '../services/ErrorService';

export class ErrorServiceImpl implements ErrorService {
	private errorRepository: ErrorRepository;

	constructor(errorRepository: ErrorRepository) {
		this.errorRepository = errorRepository;
	}

	deleteError(id: number): ReturnType<ErrorRepository['deleteError']> {
		return this.errorRepository.deleteError(id);
	}

	queryErrorList(query: ErrorQueryListParams) {
		return this.errorRepository.queryErrorList(query);
	}

	sendErrorEmail(errorInfo: CreateErrorMessageDto): ReturnType<ErrorRepository['sendErrorEmail']> {
		return this.errorRepository.sendErrorEmail(errorInfo);
	}
}
