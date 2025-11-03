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

}
