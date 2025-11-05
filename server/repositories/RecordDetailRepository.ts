import type { PrismaClient } from '@prisma/client';
import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { prisma } from '../core/prisma';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import { extname, join } from 'path';
import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import fs from 'fs';

export class RecordDetailRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部记录详情
	async getAllRecordDetails(query: { pageNumber: number; pageSize: number }) {
		try {
			const { pageNumber, pageSize } = query;
			const offset = (pageNumber - 1) * pageSize;

			const [records, total] = await Promise.all([
				this.prismaClient.record_detail.findMany({
					orderBy: { created_at: 'desc' },
					skip: offset,
					take: pageSize,
				}),
				this.prismaClient.record_detail.count(),
			]);

			return returnData(StatusCode.SUCCESS, '查询成功！', { records, total });
		} catch (error) {
			return returnData(StatusCode.FAIL, '查询失败！', null);
		}
	}

	// 新增记录详情
	async createRecordDetail(data: CreateRecordDetailDto) {
		try {
			const res = await this.prismaClient.record_detail.create({
				data: {
					...data,
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '创建成功！', res)
				: returnData(StatusCode.FAIL, '创建失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '创建失败！', null);
		}
	}

	// 更新记录详情
	async updateRecordDetail(data: Partial<CreateRecordDetailDto>) {
		try {
			const { id, ...updateData } = data;
			const res = await this.prismaClient.record_detail.update({
				where: { id },
				data: updateData,
			});

			return res
				? returnData(StatusCode.SUCCESS, '更新成功！', res)
				: returnData(StatusCode.FAIL, '更新失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '更新失败！', null);
		}
	}

	// 删除记录详情
	async deleteRecordDetail(id: number) {
		try {
			const res = await this.prismaClient.record_detail.delete({
				where: { id: Number(id) },
			});

			return res
				? returnData(StatusCode.SUCCESS, '删除成功！', res)
				: returnData(StatusCode.FAIL, '删除失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '删除失败！', null);
		}
	}

	// 上传记录详情图片
	async uploadRecordDetailImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		try {
			if (!files || files.length === 0) {
				return returnData(StatusCode.FAIL, '没有上传文件！', null);
			}

			const file = files[0];

			// 验证文件
			if (!file.data || !file.filename) {
				return returnData(StatusCode.FAIL, '文件数据无效！', null);
			}

			// 验证文件类型
			const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
			const fileExtension = extname(file.filename).toLowerCase();

			if (!allowedExtensions.includes(fileExtension)) {
				return returnData(StatusCode.FAIL, '不支持的文件格式，只允许 JPG、PNG、GIF、WebP 格式！', null);
			}

			// 验证文件大小
			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.data.length > maxSize) {
				return returnData(StatusCode.FAIL, '文件大小不能超过 5MB！', null);
			}

			// 生成安全的文件名
			const timestamp = Date.now();
			const uuid = randomUUID().replace(/-/g, '').substring(0, 8);
			const safeFileName = `recorddetail_${timestamp}_${uuid}${fileExtension}`;

			// 确保目录存在
			const uploadDir = join(process.cwd(), 'public/recorddetail');
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const savePath = join(uploadDir, safeFileName);

			// 保存文件
			await writeFile(savePath, file.data);

			// 返回文件访问路径
			return returnData(StatusCode.SUCCESS, '上传成功！', { url: `/recorddetail/${safeFileName}` });
		} catch (error) {
			return returnData(StatusCode.FAIL, '上传失败！', null);
		}
	}
}
