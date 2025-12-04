import { container } from '~/server/core/container';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const ipRawHeader = event.node.req.headers['x-forwarded-for'];
	const ipRaw =
		typeof ipRawHeader === 'string'
			? ipRawHeader
			: Array.isArray(ipRawHeader)
				? ipRawHeader.join(',')
				: event.node.req.socket.remoteAddress || '';
	const ip = ipRaw.split(',')[0].trim().replace('::ffff:', '');
	const userAgent = event.node.req.headers['user-agent'] || '';

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的记录详情ID');
		return null;
	}

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.addRecordDetailView(Number(id), ip.toString(), userAgent);
	} catch (error) {
		sendErrorWithMessage(event, 500, '记录详情浏览量增加失败');
		return null;
	}
});
