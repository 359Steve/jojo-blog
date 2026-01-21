import ExifReader from 'exifreader';
import sharp from 'sharp';
import { compressSharp } from './img-compress';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'pathe';
import { encode as blurhashEncode } from 'blurhash';
import convert from 'heic-convert';

// 存储图片
const saveImage = async (baseName: string, uploadDir: string, imgBuffer: Buffer<ArrayBufferLike>): Promise<string> => {
	const pngFileName = `${baseName}.png`;
	const pngFilePath = join(uploadDir, pngFileName);
	await writeFile(pngFilePath, imgBuffer);
	return pngFilePath;
};

// 生成blurhash并存储json
const saveJson = async (baseName: string, uploadDir: string, imgBuffer: Buffer<ArrayBufferLike>) => {
	const blurhashImg = sharp(imgBuffer);
	const { data, info } = await blurhashImg
		.raw()
		.ensureAlpha()
		.resize(32, 32, { fit: 'cover' })
		.toBuffer({ resolveWithObject: true });
	const blurhash = blurhashEncode(new Uint8ClampedArray(data), info?.width || 32, info?.height || 32, 4, 4);

	const jsonFilePath = join(uploadDir, `${baseName}.json`);
	await writeFile(jsonFilePath, JSON.stringify({ blurhash }, null, 2));
};

// 保存mov
const saveMov = async (baseName: string, uploadDir: string, movBuffer: Buffer<ArrayBufferLike>): Promise<string> => {
	const movFileName = `${baseName}.mov`;
	const movFilePath = join(uploadDir, movFileName);
	await writeFile(movFilePath, movBuffer);

	return movFileName;
};
/**
 * 处理上传的图片：压缩、提取EXIF、基于日期重命名
 * @param buffer 图片的 Buffer 数据
 * @param originalFilename 原始文件名
 * @param uploadDir 上传目录
 * @param baseUrl 基础URL路径（用于生成返回的URL）
 * @returns 处理后的图片信息
 */
export async function processUploadedImage(
	buffer: Buffer,
	originalFilename: string,
	uploadDir: string,
	baseUrl: string,
): Promise<ProcessedImageResult> {
	// 读取图片和EXIF数据
	const img = sharp(buffer);
	const exif = await ExifReader.load(buffer);

	// 提取日期信息
	let dateRaw = exif.DateTimeOriginal?.value || exif.DateTime?.value || exif.DateCreated?.value;
	if (Array.isArray(dateRaw)) dateRaw = dateRaw[0] as string;
	dateRaw = String(dateRaw || new Date().toISOString());

	// 转换日期格式：2025:02:02 10:07:10 -> Date对象
	let date = new Date(
		dateRaw.replace(/:/g, (x, idx) => {
			if (idx < 10) return '-';
			return x;
		}),
	);
	if (Number.isNaN(+date)) {
		date = new Date();
	}

	// 获取文件扩展名
	const fileExtension = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
	const ext = fileExtension === 'jpeg' ? '.jpg' : `.${fileExtension}`;

	// 生成基于日期的文件名
	const base = `p-${date.toISOString().replace(/[:.a-z]+/gi, '-')}`;
	let index = 1;
	let fileName = `${base}${index}${ext}`.toLowerCase();
	let filePath = join(uploadDir, fileName);

	// 如果文件已存在，增加索引
	while (existsSync(filePath)) {
		index++;
		fileName = `${base}${index}${ext}`.toLowerCase();
		filePath = join(uploadDir, fileName);
	}

	// 压缩图片
	const { outBuffer, percent } = await compressSharp(img, buffer, originalFilename, filePath);

	// 写入压缩后的文件
	await writeFile(filePath, outBuffer);

	// 生成 blurhash
	const blurhashImg = sharp(outBuffer);
	const { data, info } = await blurhashImg
		.raw()
		.ensureAlpha()
		.resize(32, 32, { fit: 'cover' })
		.toBuffer({ resolveWithObject: true });
	const blurhash = blurhashEncode(new Uint8ClampedArray(data), info?.width || 32, info?.height || 32, 4, 4);

	// 生成对应的 JSON 文件
	const jsonFilePath = filePath.replace(/\.\w+$/, '.json');
	const jsonContent = {
		blurhash,
	};
	await writeFile(jsonFilePath, JSON.stringify(jsonContent, null, 2));

	return {
		originalName: originalFilename,
		fileName,
		url: `${baseUrl}/${fileName}`,
		size: outBuffer.byteLength,
		originalSize: buffer.byteLength,
		type: `image/${fileExtension}`,
		date,
	};
}

