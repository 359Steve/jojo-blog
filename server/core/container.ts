import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { USER_SERVICE } from '../services/UserService';
import { TagRepository } from '../repositories/TagRepository';
import { TAG_SERVICE } from '../services/TagService';
import { BLOG_SERVICE } from '../services/BlogService';
import { BlogRepository } from '../repositories/BlogRepository';
import { MD_SERVICE } from '../services/MdService';
import { MdRepository } from '../repositories/MdRepository';
import { GROUP_SERVICE } from '../services/GroupService';
import { GroupRepository } from '../repositories/GroupRepository';
import { RECORD_DETAIL_SERVICE } from '../services/RecordDetailService';
import { RecordDetailRepository } from '../repositories/RecordDetailRepository';
import { ERROR_SERVICE } from '../services/ErrorService';
import { ErrorRepository } from '../repositories/ErrorRepository';
import { BlogServiceImpl } from '../serviceImpl/BlogServiceImpl';
import { UserServiceImpl } from '../serviceImpl/UserServiceImpl';
import { TagServiceImpl } from '../serviceImpl/TagServiceImpl';
import { GroupServiceImpl } from '../serviceImpl/GroupServiceImpl';
import { RecordDetailServiceImpl } from '../serviceImpl/RecordDetailServiceImpl';
import { MdServiceImpl } from '../serviceImpl/MdServiceImpl';
import { ErrorServiceImpl } from '../serviceImpl/ErrorServiceImpl';
import { StatisticalRepository } from '../repositories/StatisticalRepository';
import { STATISTICAL_SERVICE } from '../services/Statistical';
import { StatisticalServiceImpl } from '../serviceImpl/StatisticalServiceImpl';

const container = new Container();

// 绑定 Repositories
container.bind(UserRepository).toSelf().inSingletonScope();
container.bind(TagRepository).toSelf().inSingletonScope();
container.bind(BlogRepository).toSelf().inSingletonScope();
container.bind(MdRepository).toSelf().inSingletonScope();
container.bind(GroupRepository).toSelf().inSingletonScope();
container.bind(RecordDetailRepository).toSelf().inSingletonScope();
container.bind(ErrorRepository).toSelf().inSingletonScope();
container.bind(StatisticalRepository).toSelf().inSingletonScope();

// 绑定 Services 并手动注入依赖
container
	.bind(USER_SERVICE)
	.toDynamicValue(() => {
		return new UserServiceImpl(container.get(UserRepository));
	})
	.inSingletonScope();

container
	.bind(TAG_SERVICE)
	.toDynamicValue(() => {
		return new TagServiceImpl(container.get(TagRepository));
	})
	.inSingletonScope();

container
	.bind(BLOG_SERVICE)
	.toDynamicValue(() => {
		return new BlogServiceImpl(container.get(BlogRepository));
	})
	.inSingletonScope();

container
	.bind(MD_SERVICE)
	.toDynamicValue(() => {
		return new MdServiceImpl(container.get(MdRepository));
	})
	.inSingletonScope();

container
	.bind(GROUP_SERVICE)
	.toDynamicValue(() => {
		return new GroupServiceImpl(container.get(GroupRepository));
	})
	.inSingletonScope();

container
	.bind(RECORD_DETAIL_SERVICE)
	.toDynamicValue(() => {
		return new RecordDetailServiceImpl(container.get(RecordDetailRepository));
	})
	.inSingletonScope();

container
	.bind(ERROR_SERVICE)
	.toDynamicValue(() => {
		return new ErrorServiceImpl(container.get(ErrorRepository));
	})
	.inSingletonScope();

container
	.bind(STATISTICAL_SERVICE)
	.toDynamicValue(() => {
		return new StatisticalServiceImpl(container.get(StatisticalRepository));
	})
	.inSingletonScope();

export { container };
