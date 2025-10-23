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
}
