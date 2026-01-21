type Options<T, Rq> = T & {
	params?: Rq;
	body?: Rq;
	query?: Rq;
};

// 响应基本信息类型
interface H3Error<T> {
	data: T;
	stack: any[];
	statusCode: number;
	statusMessage: string;
	[key: string]: any;
}

type NewResponse<T> = NitroResponse<T> & H3Error<T>;

// 按文件基名分组
interface FileGroup {
	stem: string;
	files: Array<{
		data: Buffer;
		filename: string;
		type: string;
		extension: string;
	}>;
}
