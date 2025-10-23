import type { PrismaClient } from '@prisma/client';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import { prisma } from '../core/prisma';
import { StatusCode } from '~/types/com-types';
import { returnData } from '../utils/public';

export class MdRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 上传图片
	async uploadImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		if (!files || files.length === 0) {
			return returnData(StatusCode.FAIL, '没有上传文件！', null);
		}

		try {
			const uploadResults = [];

			for (const file of files) {
				if (!file.data || !file.filename) {
					continue;
				}

				// 生成唯一文件名，避免冲突
				const timestamp = Date.now();
				const randomStr = Math.random().toString(36).substring(2, 8);
				const fileExtension = file.filename.split('.').pop() || 'png';
				const fileName = `md_${timestamp}_${randomStr}.${fileExtension}`;

				// 确保文件夹存在
				const uploadDir = join(process.cwd(), 'public/mdfile');
				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir, { recursive: true });
				}

				const filePath = join(uploadDir, fileName);

				// 写入文件
				await writeFile(filePath, file.data);

				// 添加到结果数组
				uploadResults.push({
					originalName: file.filename,
					fileName: fileName,
					url: `/mdfile/${fileName}`,
					size: file.data.length,
				});
			}

			if (uploadResults.length === 0) {
				return returnData(StatusCode.FAIL, '没有有效的文件上传！', null);
			}

			return returnData(StatusCode.SUCCESS, '上传成功！', {
				files: uploadResults,
				urls: uploadResults.map((item) => item.url),
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '上传失败，请重试！', null);
		}
	}
}
