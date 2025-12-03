import type { CreateGroupDto } from '../dto/CreateGroupDto';
import type { GroupRepository } from '../repositories/GroupRepository';

export const GROUP_SERVICE = Symbol('GroupService');
export interface GroupService {
	// 新增分组
	createGroup(data: CreateGroupDto): ReturnType<GroupRepository['createGroup']>;
	// 查询全部分组
	getAllGroups(query: Omit<FindAllReq, 'name'>): ReturnType<GroupRepository['getAllGroups']>;
	// 更新分组
	updateGroup(data: Partial<CreateGroupDto>): ReturnType<GroupRepository['updateGroup']>;
	// 删除分组
	deleteGroup(id: number): ReturnType<GroupRepository['deleteGroup']>;
	// 查询分组时间范围
	getGroupTimeRanges(): ReturnType<GroupRepository['getGroupTimeRanges']>;
	// 查询公共分组数据
	getPublicGroups(query: { id?: number }): ReturnType<GroupRepository['getPublicGroups']>;
}
