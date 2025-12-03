import type { CreateGroupDto } from '../dto/CreateGroupDto';
import type { GroupRepository } from '../repositories/GroupRepository';
import type { GroupService } from '../services/GroupService';

export class GroupServiceImpl implements GroupService {
	private groupRepository: GroupRepository;

	constructor(groupRepository: GroupRepository) {
		this.groupRepository = groupRepository;
	}

	createGroup(data: CreateGroupDto): ReturnType<GroupRepository['createGroup']> {
		return this.groupRepository.createGroup(data);
	}
	getAllGroups(query: Omit<FindAllReq, 'name'>): ReturnType<GroupRepository['getAllGroups']> {
		return this.groupRepository.getAllGroups(query);
	}
	updateGroup(data: Partial<CreateGroupDto>): ReturnType<GroupRepository['updateGroup']> {
		return this.groupRepository.updateGroup(data);
	}
	deleteGroup(id: number): ReturnType<GroupRepository['deleteGroup']> {
		return this.groupRepository.deleteGroup(id);
	}
	getGroupTimeRanges(): ReturnType<GroupRepository['getGroupTimeRanges']> {
		return this.groupRepository.getGroupTimeRanges();
	}
	getPublicGroups(query: { id?: number }): ReturnType<GroupRepository['getPublicGroups']> {
		return this.groupRepository.getPublicGroups(query);
	}
}
