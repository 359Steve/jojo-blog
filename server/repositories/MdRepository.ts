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

	// 验证图片文件头
	private validateImageFileHeader(fileData: Buffer, extension: string): boolean {
		if (!fileData || fileData.length < 8) {
			return false;
		}

		// 获取文件头字节
		const header = fileData.subarray(0, 8);

		switch (extension.toLowerCase()) {
			case 'jpg':
			case 'jpeg':
				// JPEG: FF D8 FF
				return header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;

			case 'png':
				// PNG: 89 50 4E 47 0D 0A 1A 0A
				return header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47;

			case 'gif':
				// GIF: 47 49 46 38 (GIF8)
				return header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x38;

			case 'webp':
				// WebP: 52 49 46 46 ... 57 45 42 50
				return header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46;

			default:
				return false;
		}
	}

	// 上传图片
	async uploadImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		if (!files || files.length === 0) {
			return returnData(StatusCode.FAIL, '没有上传文件！', null);
		}

		try {
			const uploadResults = [];

			// 定义允许的图片类型和扩展名
			const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
			const maxFileSize = 5 * 1024 * 1024; // 5MB

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

				// 验证文件头
				const isValidImage = this.validateImageFileHeader(file.data, fileExtension);
				if (!isValidImage) {
					continue;
				}

				// 生成安全的文件名
				const timestamp = Date.now();
				const randomStr = Math.random().toString(36).substring(2, 8);
				const safeFileName = `md_${timestamp}_${randomStr}.${fileExtension}`;

				// 确保文件夹存在
				const uploadDir = join(process.cwd(), 'public/mdfile');
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
					url: `/mdfile/${safeFileName}`,
					size: file.data.length,
					type: file.type || `image/${fileExtension}`,
				});
			}

			if (uploadResults.length === 0) {
				return returnData(StatusCode.FAIL, '没有有效的图片文件上传！请确保文件为图片格式且小于5MB', null);
			}

			return returnData(StatusCode.SUCCESS, `成功上传 ${uploadResults.length} 个图片文件！`, {
				files: uploadResults,
				urls: uploadResults.map((item) => item.url),
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '上传失败，请重试！', null);
		}
	}
}
