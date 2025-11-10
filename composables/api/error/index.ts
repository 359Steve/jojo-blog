import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { CreateErrorMessageDto } from '~/server/dto/CreateErrorMessageDto';

// 发送邮件
export const sendErrorEmail = async (data: CreateErrorMessageDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateErrorMessageDto, SMTPTransport.SentMessageInfo>('/error/sendEmail', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};
