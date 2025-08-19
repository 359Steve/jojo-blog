/** 技术栈图标颜色 */
export enum StackColor {
	// === 前端核心 ===
	HTML = '#e34c26',
	CSS = '#563d7c',
	JavaScript = '#f1e05a',
	TypeScript = '#3178c6',

	// === 前端框架 ===
	Vue = '#4fc08d',
	React = '#61dafb',
	Angular = '#dd0031',
	Svelte = '#ff3e00',
	Nuxt = '#00dc82',
	Next = '#000000',
	Vite = '#646cff',

	// === UI 框架 ===
	ElementPlus = '#409EFF',
	AntDesign = '#1677ff',
	Bootstrap = '#7952b3',
	TailwindCSS = '#38bdf8',
	Vuetify = '#1867c0',
	ChakraUI = '#319795',
	MaterialUI = '#007fff',

	// === 前端工具库 ===
	Axios = '#5a29e4',
	VueUse = '#9c74f2',
	Pinia = '#ffe66d',
	Redux = '#764abc',
	RxJS = '#d81b60',
	Lodash = '#3492FF',
	jQuery = '#0769ad',
	Zod = '#3c3c3c',

	// === 后端框架 ===
	Node = '#339933',
	Express = '#000001',
	NestJS = '#ea2845',
	SpringBoot = '#6DB33F',
	Koa = '#333333',
	Django = '#092e20',
	Flask = '#000002',
	FastAPI = '#009688',
	Laravel = '#ff2d20',
	RubyOnRails = '#cc0000',

	// === 数据库 ===
	MySQL = '#4479A1',
	PostgreSQL = '#336791',
	MongoDB = '#47A248',
	Redis = '#DC7633',
	SQLite = '#003B57',
	MariaDB = '#003545',
	Firebase = '#FFCA28',
	Supabase = '#3ecf8e',

	// === 云平台 & DevOps ===
	AWS = '#FF9900',
	GCP = '#4285F4',
	Azure = '#0078D7',
	Docker = '#2496ED',
	Kubernetes = '#326CE5',
	Jenkins = '#D24939',
	GitHubActions = '#2088FF',
	Vercel = '#000003',
	Netlify = '#00C7B7',
	Cloudflare = '#F38020',
	Nginx = '#009639',

	// === 版本控制 & 工具 ===
	Git = '#F05032',
	GitHub = '#181717',
	GitLab = '#e24329',
	Bitbucket = '#0052CC',

	// === 构建工具 ===
	Webpack = '#8dd6f9',
	Rollup = '#ec4a3f',
	Babel = '#f9dc3e',
	ESLint = '#4B32C3',
	Prettier = '#f7b93e',
	PNPM = '#F69220',
	Yarn = '#2c8ebb',
	NPM = '#CB3837',
	TurboRepo = '#00000',
	Lerna = '#3b3b3b',
	Vitest = '#6E9F18',

	// === 移动端 / 跨平台 ===
	ReactNative = '#61daf1',
	Flutter = '#02569B',
	Electron = '#47848F',
	UniApp = '#007AFF',
	Taro = '#00BFFF',

	// === 测试工具 ===
	Jest = '#99425b',
	Cypress = '#17202c',
	Playwright = '#2e2e2e',
	Mocha = '#8D6748',
	Chai = '#A30701',

	// === 环境 / 操作系统 ===
	Linux = '#FCC624',
	Windows = '#0078D8',
	MacOS = '#000004',
	WSL = '#4a8cbf',
	Ubuntu = '#E95420',

	// === 编辑器 / 工具 ===
	VSCode = '#007ACC',
	WebStorm = '#000005',
	IntelliJ = '#000006',
	Postman = '#FF6C37',
	Figma = '#F24E1E',
	Chrome = '#4285F5',
	Edge = '#0078D9'
}

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
	UNAUTHORIZED = 1001,

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

