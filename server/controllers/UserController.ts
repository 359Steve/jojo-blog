import type { H3Event } from 'h3';
import { injectable } from 'inversify';
import { container } from '../core/container';
import { controller } from '../core/decorators';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { UserService } from '../services/UserService';

@controller
@injectable()
export class UserController {
	private userService: UserService;

	constructor() {
		this.userService = container.get(UserService);
	}

	// 新增用户
	async createUser(event: H3Event) {
		const body = await readBody<CreateUserDto>(event);
		// const dto = plainToInstance(CreateUserDto, body);
		// const errors = await validate(dto);

		return await this.userService.createUser(body);
	}

	// 查询用户
	async findUser(event: H3Event) {
		const { id } = getQuery<{ id: number }>(event);
		return await this.userService.findUser(id);
	}
}
