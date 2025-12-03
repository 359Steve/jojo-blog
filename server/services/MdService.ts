import type { MdRepository } from '../repositories/MdRepository';

export const MD_SERVICE = Symbol('MD_SERVICE');
export interface MdService {
	// 上传图片
	uploadImage(
		files: ReturnFunction<typeof readMultipartFormData>,
		datePath: string,
	): ReturnType<MdRepository['uploadImage']>;
	// 删除指定目录下的图片
	deleteMdPicture(picPath: string, fileNames: string[]): ReturnType<MdRepository['deleteMdPicture']>;
}
