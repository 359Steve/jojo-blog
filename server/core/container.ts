import { Container } from 'inversify';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

const container = new Container();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();

export { container };
