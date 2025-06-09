import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

const container = new Container();
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();

export { container };
