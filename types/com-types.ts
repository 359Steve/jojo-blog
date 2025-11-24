/**
 * 请求返回状态码
 */
export enum StatusCode {
	/** 请求成功 */
	SUCCESS = 200,

	/** 通用失败 */
	FAIL = -1,

	/** 参数错误（缺少或格式不对） */
	PARAM_ERROR = 1000,

	/** 未登录 / Token 缺失 */
	UNAUTHORIZED = 401,

	/** 登录已过期 / Token 无效 */
	TOKEN_EXPIRED = 1002,

	/** 权限不足 */
	FORBIDDEN = 1003,

	/** 资源不存在 */
	NOT_FOUND = 1004,

	/** 操作不允许（状态不对） */
	NOT_ALLOWED = 1005,

	/** 请求过于频繁 / 限流 */
	TOO_MANY_REQUESTS = 1006,

	/** 数据重复（如注册时手机号已存在） */
	DUPLICATE = 1007,

	/** 服务器处理异常 */
	SERVER_ERROR = 1008,

	/** 用户名或密码错误 */
	LOGIN_FAILED = 2000,

	/** 用户被禁用 */
	USER_DISABLED = 2001,

	/** 用户不存在 */
	USER_NOT_EXIST = 2002,

	/** 注册失败 */
	REGISTER_FAILED = 2003,

	/** 修改密码失败 */
	CHANGE_PASSWORD_FAILED = 2004,
}
