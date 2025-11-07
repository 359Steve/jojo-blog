import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { RecordDetailRepository } from '../repositories/RecordDetailRepository';

export class RecordDetailService {
	private recordDetailRepo: RecordDetailRepository;
	constructor() {
		this.recordDetailRepo = new RecordDetailRepository();
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
	async uploadRecordDetailImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		return await this.recordDetailRepo.uploadRecordDetailImage(files);
	}

	// 查询单个记录详情
	async getPublicRecordDetail(parentId: number, id: number) {
		return await this.recordDetailRepo.getPublicRecordDetail(parentId, id);
	}
}
