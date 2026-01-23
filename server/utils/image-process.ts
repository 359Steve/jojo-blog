import ExifReader from 'exifreader';
import sharp from 'sharp';
import { compressSharp } from './img-compress';
import { writeFile } from 'node:fs/promises';
import { join } from 'pathe';
import { encode as blurhashEncode } from 'blurhash';
import convert from 'heic-convert';

// 获取文件详细地址
const getFilePath = (uploadDir: string, originalFilename: string, baseName: string) => {
	const fileExtension = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
	const ext = fileExtension === 'jpeg' ? '.jpg' : `.${fileExtension}`;

	const fileName = `${baseName}${ext}`;
	const filePath = join(uploadDir, fileName);

	return {
		fileName,
		filePath,
	};
};

// 存储图片
const saveImage = async (baseName: string, uploadDir: string, imgBuffer: Buffer<ArrayBufferLike>): Promise<string> => {
	const pngFileName = `${baseName}.png`;
	const pngFilePath = join(uploadDir, pngFileName);
	await writeFile(pngFilePath, imgBuffer);
	return pngFileName;
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

// 压缩图片
const zipImage = async (
	pngBuffer: Buffer<ArrayBufferLike>,
	filePath: string,
	fileName: string,
): Promise<Buffer<ArrayBufferLike>> => {
	const pngImg = sharp(pngBuffer);
	const { outBuffer } = await compressSharp(pngImg, pngBuffer, fileName, filePath);

	return outBuffer;
};

/**
 * 从 Buffer 提取 EXIF 日期
 * @param buffer 图片的 Buffer 数据
 * @returns 提取的日期或当前日期
 */
export const extractExifDate = async (buffer: Buffer): Promise<Date> => {
	try {
		const exif = await ExifReader.load(buffer);
		let dateRaw = exif.DateTimeOriginal?.value || exif.DateTime?.value || exif.DateCreated?.value;
		if (Array.isArray(dateRaw)) dateRaw = dateRaw[0] as string;
		dateRaw = String(dateRaw || new Date().toISOString());

		const date = new Date(
			dateRaw.replace(/:/g, (x, idx) => {
				if (idx < 10) return '-';
				return x;
			}),
		);
		return Number.isNaN(+date) ? new Date() : date;
	} catch (error) {
		return new Date();
	}
};

/**
 * 转换 HEIC 为 PNG（使用 heic-convert 库）
 * @param heicBuffer HEIC 图片的 Buffer
 * @returns PNG Buffer
 */
const convertHeicToPngBuffer = async (heicBuffer: Buffer): Promise<Buffer> => {
	const outputBuffer = await convert({
		buffer: heicBuffer,
		format: 'PNG',
		quality: 1, // 最高质量
	});
	return Buffer.from(outputBuffer);
};

/**
 * 处理实况图片（HEIC + MOV）
 * 注意：实况图片的 HEIC 转 PNG 不压缩，保持原始质量
 * @param heicBuffer HEIC 图片的 Buffer
 * @param movBuffer MOV 视频的 Buffer
 * @param uploadDir 上传目录（子目录 base/）
 * @param baseUrl 基础URL路径
 * @param baseName 文件名（如 p-2025-01-21T15-30-45-123-）
 * @returns 处理后的 PNG 和 MOV 的 URL
 */
export const processLivePhoto = async (
	heicBuffer: Buffer,
	movBuffer: Buffer,
	uploadDir: string,
	baseUrl: string,
	baseName: string,
): Promise<string> => {
	// 转换HEIC为PNG
	const pngBuffer = await convertHeicToPngBuffer(heicBuffer);

	// 压缩图片
	const compressedPngBuffer = await zipImage(pngBuffer, join(uploadDir, 'temp.png'), 'converted.png');

	// 保存图片
	const pngFileName = await saveImage(baseName, uploadDir, compressedPngBuffer);

	// 保存json
	await saveJson(baseName, uploadDir, compressedPngBuffer);

	// 保存mov
	await saveMov(baseName, uploadDir, movBuffer);

	return `${baseUrl}/${pngFileName}`;
};

/**
 * 处理单独的 HEIC 文件，转换为 PNG（带压缩）
 * @param heicBuffer HEIC 图片的 Buffer
 * @param originalFilename 原始文件名
 * @param uploadDir 上传目录（子目录 base/）
 * @param baseUrl 基础URL路径
 * @param baseName 文件名（如 p-2025-01-21T15-30-45-123-）
 * @returns 处理后的 PNG URL
 */
export const processHeicToPng = async (
	heicBuffer: Buffer,
	uploadDir: string,
	baseUrl: string,
	baseName: string,
): Promise<string> => {
	// 转换HEIC为PNG
	const pngBuffer = await convertHeicToPngBuffer(heicBuffer);

	const compressedPngBuffer = await zipImage(pngBuffer, join(uploadDir, 'temp.png'), 'converted.png');

	// 保存图片
	const pngFileName = await saveImage(baseName, uploadDir, compressedPngBuffer);

	// 保存json
	await saveJson(baseName, uploadDir, pngBuffer);

	return `${baseUrl}/${pngFileName}`;
};

/**
 * 处理普通图片（在子目录下处理）
 * @param buffer 图片的 Buffer 数据
 * @param originalFilename 原始文件名
 * @param uploadDir 上传目录（子目录 base/）
 * @param baseUrl 基础URL路径
 * @param baseName 文件名（如 p-2025-01-21T15-30-45-123-）
 * @returns 处理后的图片信息
 */
export const processImageInSubDir = async (
	buffer: Buffer,
	originalFilename: string,
	uploadDir: string,
	baseUrl: string,
	baseName: string,
): Promise<string> => {
	// 获取文件扩展名
	const { fileName, filePath } = getFilePath(uploadDir, originalFilename, baseName);
	// 压缩图片
	const outBuffer = await zipImage(buffer, filePath, fileName);

	// 写入压缩后的文件
	await writeFile(filePath, outBuffer);

	// 保存json
	await saveJson(baseName, uploadDir, outBuffer);

	return `${baseUrl}/${fileName}`;
};
