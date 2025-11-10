module.exports = {
	apps: [
		{
			name: 'nuxt-app',
			script: '.output/server/index.mjs',
			instances: 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'production',
				DATABASE_URL: 'mysql://root:huhai20020103@localhost:3306/jojo-blog',
			},
			env_production: {
				NODE_ENV: 'production',
				DATABASE_URL: 'mysql://root:huhai20020103@localhost:3306/jojo-blog',
			},
		},
	],
};
