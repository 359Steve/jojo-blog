import { container } from '../core/container';
import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { RecordDetailRepository } from '../repositories/RecordDetailRepository';

export class RecordDetailService {
	private recordDetailRepo: RecordDetailRepository;
	constructor() {
		this.recordDetailRepo = container.get(RecordDetailRepository);
	}

	// 新增记录详情
	async createRecordDetail(data: CreateRecordDetailDto) {
		return await this.recordDetailRepo.createRecordDetail(data);
	}

	// 查询全部记录详情
	async getAllRecordDetails(query: { pageNumber: number; pageSize: number }) {
		return await this.recordDetailRepo.getAllRecordDetails(query);
	}

	// 更新记录详情
	async updateRecordDetail(data: Partial<CreateRecordDetailDto>) {
		return await this.recordDetailRepo.updateRecordDetail(data);
	}

	// 删除记录详情
	async deleteRecordDetail(id: number) {
		return await this.recordDetailRepo.deleteRecordDetail(id);
	}

	// 上传记录详情图片
	async uploadRecordDetailImage(files: Awaited<ReturnType<typeof readMultipartFormData>>, datePath: string) {
		return await this.recordDetailRepo.uploadRecordDetailImage(files, datePath);
	}

	// 查询单个记录详情
	async getPublicRecordDetail(parentId: number, id: number) {
		return await this.recordDetailRepo.getPublicRecordDetail(parentId, id);
	}

	// 查询照片
	async getPublicRecordPictures(query: FindPictureRequest) {
		return await this.recordDetailRepo.getPublicRecordPictures(query);
	}

	// 分页查询记录详情
	async getPublicRecordDetails(query: RecordQueryParams) {
		return await this.recordDetailRepo.getPublicRecordDetails(query);
	}
}
