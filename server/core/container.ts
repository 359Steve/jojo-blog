import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';
import { TagRepository } from '../repositories/TagRepository';
import { TagService } from '../services/TagService';

const container = new Container();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();
container.bind(TagRepository).toSelf();
container.bind(TagService).toSelf();

export { container };
