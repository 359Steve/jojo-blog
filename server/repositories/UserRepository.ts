import { PrismaClient } from '@prisma/client';
import type { CreateUserDto } from '../dto/CreateUserDto';

export class UserRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async createUser(dto: CreateUserDto) {
		return this.prisma.user_info.create({
			data: {
				...dto
			}
		});
	}

	async loginUser(body: CreateUserDto) {
		const { user_name, password } = body;
		return this.prisma.user_info.findFirst({
			where: {
				user_name,
				password
			}
		});
	}

	async findUser(id: number) {
		return this.prisma.user_info.findUnique({
			where: {
				id: Number(id)
			}
		});
	}
}
