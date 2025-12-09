import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import type { RecordDetailRepository } from '../repositories/RecordDetailRepository';
import type { RecordDetailService } from '../services/RecordDetailService';

export class RecordDetailServiceImpl implements RecordDetailService {
	private recordDetailRepository: RecordDetailRepository;

	constructor(recordDetailRepository: RecordDetailRepository) {
		this.recordDetailRepository = recordDetailRepository;
	}
	addRecordDetailView(id: number, ip: string, userAgent: string) {
		return this.recordDetailRepository.addRecordDetailView(id, ip, userAgent);
	}

	createRecordDetail(data: CreateRecordDetailDto): ReturnType<RecordDetailRepository['createRecordDetail']> {
		return this.recordDetailRepository.createRecordDetail(data);
	}
	getAllRecordDetails(query: {
		pageNumber: number;
		pageSize: number;
	}): ReturnType<RecordDetailRepository['getAllRecordDetails']> {
		return this.recordDetailRepository.getAllRecordDetails(query);
	}
	updateRecordDetail(data: Partial<CreateRecordDetailDto>): ReturnType<RecordDetailRepository['updateRecordDetail']> {
		return this.recordDetailRepository.updateRecordDetail(data);
	}
	deleteRecordDetail(id: number): ReturnType<RecordDetailRepository['deleteRecordDetail']> {
		return this.recordDetailRepository.deleteRecordDetail(id);
	}
	uploadRecordDetailImage(
		files: ReturnFunction<typeof readMultipartFormData>,
		datePath: string,
	): ReturnType<RecordDetailRepository['uploadRecordDetailImage']> {
		return this.recordDetailRepository.uploadRecordDetailImage(files, datePath);
	}
	getPublicRecordDetail(parentId: number, id: number): ReturnType<RecordDetailRepository['getPublicRecordDetail']> {
		return this.recordDetailRepository.getPublicRecordDetail(parentId, id);
	}
	getPublicRecordPictures(query: FindPictureRequest): ReturnType<RecordDetailRepository['getPublicRecordPictures']> {
		return this.recordDetailRepository.getPublicRecordPictures(query);
	}
	getPublicRecordDetails(): ReturnType<RecordDetailRepository['getPublicRecordDetails']> {
		return this.recordDetailRepository.getPublicRecordDetails();
	}
}
