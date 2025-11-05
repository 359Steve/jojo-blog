import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { TagRepository } from '../repositories/TagRepository';
import { TagService } from '../services/TagService';
import { BlogService } from '../services/BlogService';
import { BlogRepository } from '../repositories/BlogRepository';
import { MdService } from '../services/MdService';
import { MdRepository } from '../repositories/MdRepository';
import { GroupService } from '../services/GroupService';
import { GroupRepository } from '../repositories/GroupRepository';
import { RecordDetailService } from '../services/RecordDetailService';
import { RecordDetailRepository } from '../repositories/RecordDetailRepository';

const container = new Container();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(TagRepository).toSelf();
container.bind(TagService).toSelf();
container.bind(BlogRepository).toSelf();
container.bind(BlogService).toSelf();
container.bind(MdService).toSelf();
container.bind(MdRepository).toSelf();
container.bind(GroupService).toSelf();
container.bind(GroupRepository).toSelf();
container.bind(RecordDetailService).toSelf();
container.bind(RecordDetailRepository).toSelf();

export { container };
