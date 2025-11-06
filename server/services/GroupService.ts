import type { CreateGroupDto } from '../dto/CreateGroupDto';
import { GroupRepository } from '../repositories/GroupRepository';

export class GroupService {
	private groupRepo: GroupRepository;
	constructor() {
		this.groupRepo = new GroupRepository();
	}

	// 新增分组
	async createGroup(data: CreateGroupDto) {
		return await this.groupRepo.createGroup(data);
	}

	// 查询全部分组
	async getAllGroups(query: Omit<FindAllReq, 'name'>) {
		return await this.groupRepo.getAllGroups(query);
	}

	// 更新分组
	async updateGroup(data: Partial<CreateGroupDto>) {
		return await this.groupRepo.updateGroup(data);
	}

	// 删除分组
	async deleteGroup(id: number) {
		return await this.groupRepo.deleteGroup(id);
	}

	// 查询分组时间范围
	async getGroupTimeRanges() {
		return await this.groupRepo.getGroupTimeRanges();
	}

	// 查询公共分组数据
	async getPublicGroups(keyword?: string) {
		return await this.groupRepo.getPublicGroups(keyword);
	}
}
