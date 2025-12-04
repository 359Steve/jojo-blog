import Ioredis from 'ioredis';

type GlobalWithRedis = typeof globalThis & { redis: Ioredis };
const globalForRedis = global as GlobalWithRedis;

export const redis =
	globalForRedis.redis ||
	new Ioredis({
		host: '127.0.0.1',
		port: 6379,
	});

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
