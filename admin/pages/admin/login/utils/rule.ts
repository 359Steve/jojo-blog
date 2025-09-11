import type { FormRules } from 'element-plus';

/** 登录校验 */
const loginRules = reactive<FormRules>({
	username: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur'
		}
	],
	password: [
		{
			validator: (_rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (!REGEXP_PWD.test(value)) {
					callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'));
				} else {
					callback();
				}
			},
			trigger: 'blur'
		}
	]
});

export { loginRules };
