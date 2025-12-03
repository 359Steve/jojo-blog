import type { CreateErrorMessageDto } from '../dto/CreateErrorMessageDto';
import type { ErrorRepository } from '../repositories/ErrorRepository';

export const ERROR_SERVICE = Symbol.for('ErrorService');
export interface ErrorService {
	// 发送邮件
	sendErrorEmail(errorInfo: CreateErrorMessageDto): ReturnType<ErrorRepository['sendErrorEmail']>;

	// 分页查询错误信息
	queryErrorList(query: ErrorQueryListParams): ReturnType<ErrorRepository['queryErrorList']>;

	// 删除错误信息
	deleteError(id: number): ReturnType<ErrorRepository['deleteError']>;
}
