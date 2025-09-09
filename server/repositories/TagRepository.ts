import { PrismaClient } from "@prisma/client";
import { returnData } from "../utils/public";
import { StatusCode } from "~/types/com-types";
import { CreateTagDto } from "../dto/CreateTagDto";
import { prisma } from "../core/prisma";

export class TagRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部标签
	async findAllTag(query: FindAllReq) {
		const { name, pageNumber, pageSize } = query

		const [records, total] = await Promise.all([
			this.prismaClient.tag.findMany({
				skip: (Number(pageNumber) - 1) * Number(pageSize),
				take: Number(pageSize),
				where: {
					name: {
						contains: name
					}
				}
			}),
			this.prismaClient.tag.count({
				where: {
					name: {
						contains: name
					}
				}
			})
		]);

		return records ? returnData(StatusCode.SUCCESS, '查询成功！', {
			records,
			total
		}) : returnData(StatusCode.FAIL, '查询失败！', null);
	}

	// 创建标签
	async createTag(value: CreateTagDto) {
		const res = await this.prismaClient.tag.create({
			data: {
				...value
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '创建成功！', res) : returnData(StatusCode.FAIL, '创建失败！', null);
	}

	// 修改标签
	async updateTag(body: CreateTagDto) {
		const res = await this.prismaClient.tag.update({
			where: {
				id: Number(body.id)
			},
			data: {
				...body
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '修改成功！', res) : returnData(StatusCode.FAIL, '修改失败！', null);
	}

	// 删除标签
	async deleteTag(id: number) {
		const res = await this.prismaClient.tag.delete({
			where: {
				id: Number(id)
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '删除成功！', res) : returnData(StatusCode.FAIL, '删除失败！', null);
	}
}
