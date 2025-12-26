import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { join } from 'pathe';

export interface ImageMetadata {
	blurhash: string;
}

/**
 * 读取图片对应的 JSON 元数据文件
 * @param imageUrl 图片的 URL 路径（例如：/recorddetail/2025-01-15-123456/p-2025-01-15-123456-1.jpg）
 * @returns 图片元数据，如果文件不存在则返回 null
 */
export async function getImageMetadata(imageUrl: string): Promise<ImageMetadata | null> {
	try {
		// 将URL路径转换为文件系统路径
		const relativePath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
		const imagePath = join(process.cwd(), 'file-system', relativePath);

		// 生成对应的JSON文件路径
		const jsonPath = imagePath.replace(/\.\w+$/, '.json');

		// 检查JSON文件是否存在
		if (!existsSync(jsonPath)) {
			return null;
		}

		// 读取并解析JSON文件
		const jsonContent = await readFile(jsonPath, 'utf-8');
		return JSON.parse(jsonContent);
	} catch (error) {
		return null;
	}
}

/**
 * 批量读取多张图片的元数据
 * @param imageUrls 图片 URL 数组
 * @returns 图片 URL 和元数据的映射对象
 */
export async function getImagesMetadata(imageUrls: string[]): Promise<Record<string, string>> {
	const metadataMap: Record<string, string> = {};

	await Promise.all(
		imageUrls.map(async (url) => {
			const metadata = await getImageMetadata(url);
			if (metadata) {
				metadataMap[url] = metadata.blurhash;
			}
		}),
	);

	return metadataMap;
}
