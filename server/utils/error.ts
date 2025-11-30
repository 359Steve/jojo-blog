import type { H3Event } from 'h3';

export const sendErrorWithMessage = (event: H3Event, statusCode: number, message: string) => {
	sendError(
		event,
		createError({
			statusCode,
			data: {
				message,
				code: statusCode,
				data: null,
			},
		}),
	);
};
