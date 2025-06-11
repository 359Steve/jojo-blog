import jwt from 'jsonwebtoken';

interface JwtPayload {
	id: number;
	username: string;
}

// 获取环境变量
const runtimeConfig = useRuntimeConfig();

// 生成token
export const signToken = (payload: Record<string, any>, expiresIn: number = 604800) => {
	// 生成token
	return jwt.sign(payload, runtimeConfig.public.jwtSecret, { expiresIn });
};

// 验证token
export const verifyToken = (token: string): JwtPayload => {
	// 验证token
	return jwt.verify(token, runtimeConfig.public.jwtSecret) as JwtPayload;
};
