import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import type { RecordDetailRepository } from '../repositories/RecordDetailRepository';

export const RECORD_DETAIL_SERVICE = Symbol('RecordDetailService');
export interface RecordDetailService {
	// 新增记录详情
	createRecordDetail(data: CreateRecordDetailDto): ReturnType<RecordDetailRepository['createRecordDetail']>;
	// 查询全部记录详情
	getAllRecordDetails(query: {
		pageNumber: number;
		pageSize: number;
	}): ReturnType<RecordDetailRepository['getAllRecordDetails']>;
	// 更新记录详情
	updateRecordDetail(data: Partial<CreateRecordDetailDto>): ReturnType<RecordDetailRepository['updateRecordDetail']>;
	// 删除记录详情
	deleteRecordDetail(id: number): ReturnType<RecordDetailRepository['deleteRecordDetail']>;
	// 上传记录详情图片
	uploadRecordDetailImage(
		files: ReturnFunction<typeof readMultipartFormData>,
		datePath: string,
	): ReturnType<RecordDetailRepository['uploadRecordDetailImage']>;
	// 查询单个记录详情
	getPublicRecordDetail(parentId: number, id: number): ReturnType<RecordDetailRepository['getPublicRecordDetail']>;
	// 查询照片
	getPublicRecordPictures(query: FindPictureRequest): ReturnType<RecordDetailRepository['getPublicRecordPictures']>;
	// 分页查询记录详情
	getPublicRecordDetails(query: RecordQueryParams): ReturnType<RecordDetailRepository['getPublicRecordDetails']>;
}
