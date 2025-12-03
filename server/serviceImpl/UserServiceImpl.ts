import type { CreateUserDto } from '../dto/CreateUserDto';
import type { UserRepository } from '../repositories/UserRepository';
import type { UserService } from '../services/UserService';

export class UserServiceImpl implements UserService {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}

	loginUser(body: Pick<CreateUserDto, 'user_name' | 'password'>): ReturnType<UserRepository['loginUser']> {
		return this.userRepository.loginUser(body);
	}

	findUser(user_name: string): ReturnType<UserRepository['findUser']> {
		return this.userRepository.findUser(user_name);
	}

	getPublicUserInfo(): ReturnType<UserRepository['getPublicUserInfo']> {
		return this.userRepository.getPublicUserInfo();
	}

	uploadAvatar(files: ReturnFunction<typeof readMultipartFormData>): ReturnType<UserRepository['uploadAvatar']> {
		return this.userRepository.uploadAvatar(files);
	}

	updateUser(body: Partial<CreateUserDto & { tags: number[] }>): ReturnType<UserRepository['updateUser']> {
		return this.userRepository.updateUser(body);
	}
}
