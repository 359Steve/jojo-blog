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
	async uploadImage(files: Awaited<ReturnType<typeof readMultipartFormData>>, datePath: string) {
		const dateTime = new Date();
		const newDatePath =
			datePath ||
			`${dateTime.getFullYear()}-${(dateTime.getMonth() + 1)
				.toString()
				.padStart(2, '0')}-${dateTime.getDate().toString().padStart(2, '0')}` +
			`-${dateTime.getHours().toString().padStart(2, '0')}` +
			`${dateTime.getMinutes().toString().padStart(2, '0')}` +
			`${dateTime.getSeconds().toString().padStart(2, '0')}`;

		if (!files || files.length === 0) {
			throw new Error('没有上传文件！');
		}

		try {
			const uploadResults = [];

			// 定义允许的图片类型和扩展名
			const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
			const maxFileSize = 10 * 1024 * 1024; // 10MB

			for (let i = 0; i < files.length; i++) {
				const file = files[i];

				if (!file.data || !file.filename) {
					continue;
				}

				// 验证文件大小
				if (file.data.length > maxFileSize) {
					continue;
				}

				// 验证文件扩展名
				const fileExtension = file.filename.split('.').pop()?.toLowerCase();
				if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
					continue;
				}

				// 验证MIME类型
				if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
					continue;
				}

				// 生成安全的文件名
				const timestamp = Date.now();
				const randomStr = Math.random().toString(36).substring(2, 8);
				const safeFileName = `md_${timestamp}_${randomStr}.${fileExtension}`;

				// 确保文件夹存在
				const uploadDir = join(process.cwd(), 'public/mdfile', newDatePath);
				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir, { recursive: true });
				}

				const filePath = join(uploadDir, safeFileName);

				// 写入文件
				await writeFile(filePath, file.data);

				// 添加到结果数组
				uploadResults.push({
					originalName: file.filename,
					fileName: safeFileName,
					url: `/mdfile/${newDatePath}/${safeFileName}`,
					size: file.data.length,
					type: file.type || `image/${fileExtension}`,
				});
			}

			if (uploadResults.length === 0) {
				throw new Error('没有有效的图片文件上传！请确保文件为图片格式且小于10MB');
			}

			return returnData(StatusCode.SUCCESS, `成功上传 ${uploadResults.length} 个图片文件`, {
				files: uploadResults,
				urls: uploadResults.map((item) => item.url).filter(Boolean),
				datePath: newDatePath,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, (error as Error).message, null);
		}
	}

	// 删除指定目录下的图片
	async deleteMdPicture(picPath: string, fileNames: string[] | string) {
		try {
			const fullDirPath = join(process.cwd(), 'public', 'mdfile', picPath);

			if (!fs.existsSync(fullDirPath)) {
				return returnData(StatusCode.FAIL, '指定目录不存在', null);
			}

			if (!Array.isArray(fileNames)) {
				fileNames = [fileNames];
			}

			const deletedFiles: string[] = [];
			const notFoundFiles: string[] = [];

			for (const fileName of fileNames) {
				const filePath = join(fullDirPath, fileName);
				if (fs.existsSync(filePath)) {
					const stats = fs.statSync(filePath);
					if (stats.isFile()) {
						fs.unlinkSync(filePath);
						deletedFiles.push(fileName);
					} else {
						notFoundFiles.push(fileName);
					}
				} else {
					notFoundFiles.push(fileName);
				}
			}

			return returnData(StatusCode.SUCCESS, '图片删除完成', {
				deletedFiles,
				notFoundFiles,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, (error as Error).message, null);
		}
	}
}
