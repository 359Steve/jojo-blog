import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
	{ vue: true },
	{
		rules: {
			// 保留你已有的规则
			'vue/multi-word-component-names': ['warn', { ignores: ['index', 'App', '[id]'] }],
			'vue/component-name-in-template-casing': [
				'warn',
				'PascalCase',
				{ registeredComponentsOnly: false, ignores: ['/^icon-/'] },
			],

			// 禁用 prettier 插件的规则（如 soybeans 内部引用了）
			'prettier/prettier': 'off',
			'no-underscore-dangle': 'off',
			// 关闭自动排序
			'import/order': 'off',
		},
	},
);
