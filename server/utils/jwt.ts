import jwt from 'jsonwebtoken';

interface JwtPayload {
	id: number;
	username: string;
}

// 获取环境变量
const { jwtSecret, expiresin } = useRuntimeConfig().public;

// 生成token
export const signToken = (payload: Record<string, any>, expiresIn: number = expiresin) => {
	// 生成token
	return jwt.sign(payload, jwtSecret, { expiresIn });
};

// 验证token
export const verifyToken = (token: string): JwtPayload => {
	// 验证token
	return jwt.verify(token, jwtSecret) as JwtPayload;
};
