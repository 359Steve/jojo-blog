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
}
