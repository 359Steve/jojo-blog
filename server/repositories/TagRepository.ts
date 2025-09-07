import { PrismaClient } from "@prisma/client";
import { returnData } from "../utils/public";
import { StatusCode } from "~/types/com-types";
import { CreateTagDto, FindAllReq } from "../dto/CreateTagDto";

export class TagRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	// 查询全部标签
	async findAllTag(query: FindAllReq) {
		const { pageNumber, pageSize } = query
		const res = await this.prisma.tag.findMany();

		const [records, total] = await Promise.all([
			this.prisma.tag.findMany({
				skip: (Number(pageNumber) - 1) * Number(pageSize),
				take: Number(pageSize)
			}),
			this.prisma.tag.count()
		]);

		return res ? returnData(StatusCode.SUCCESS, '查询成功！', {
			records,
			total
		}) : returnData(StatusCode.FAIL, '查询失败！', null);
	}

	// 创建标签
	async createTag<T>(value: CreateTagDto): Promise<NitroResponse<T>> {
		const res = await this.prisma.tag.create({
			data: {
				...value
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '创建成功！', res as T) : returnData<T>(StatusCode.FAIL, '创建失败！', null);
	}
}
