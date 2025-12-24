module.exports = {
	apps: [
		{
			name: 'nuxt-app',
			script: '.output/server/index.mjs',
			exec_mode: 'fork',
			instances: 1,
			env: {
				NODE_ENV: 'production',
				DATABASE_URL: 'mysql://root:huhai20020103@localhost:3306/jojo-blog',
				REDIS_HOST: '127.0.0.1',
			},
			env_production: {
				NODE_ENV: 'production',
				DATABASE_URL: 'mysql://root:huhai20020103@localhost:3306/jojo-blog',
				REDIS_HOST: '127.0.0.1',
			},
		},
	],
};
