// 上传md图片返回值类型
interface MdUploadImageFile {
	originalName: string;
	fileName: string;
	url: string;
	size: number;
}

interface MdUploadImageResponse {
	urls: string[];
	files: MdUploadImageFile[];
	datePath: string;
}

// 删除指定目录下的图片返回值类型
interface MdDeleteImageDirResponse {
	deletedFiles: string[];
	notFoundFiles: string[];
}

// 删除指定目录下的图片请求参数类型
interface MdDeleteImageDirRequest {
	datePath: string;
	fileNames: string[];
}
