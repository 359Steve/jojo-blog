import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';
import type { CreateUserDto } from '../dto/CreateUserDto';

@injectable()
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

	async findUser(id: number) {
		return this.prisma.user_info.findUnique({
			where: {
				id: Number(id)
			}
		});
	}
}
