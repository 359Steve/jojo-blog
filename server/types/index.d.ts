type Method = 'get' | 'post' | 'put' | 'delete';
// 自定义 Options 类型
interface Options<T> {
	baseURL?: string;
	method?: Method;
	body?: T;
	query?: T;
	params?: T;
	headers?: Record<string, string>;
	[key: string]: any;
}
// 响应基本信息类型
interface H3Error<T> {
	data: T;
	stack: any[];
	statusCode: number;
	statusMessage: string;
	[key: string]: any;
}

type NewResponse<T> = NitroResponse<T> & H3Error<T>;
