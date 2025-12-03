import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import type { ErrorRepository } from '../repositories/ErrorRepository';

export const ERROR_SERVICE = Symbol.for('ErrorService');
export interface ErrorService {
	// 发送邮件
	sendErrorEmail(errorInfo: CreateErrorMessageDto): ReturnType<ErrorRepository['sendErrorEmail']>;
}
