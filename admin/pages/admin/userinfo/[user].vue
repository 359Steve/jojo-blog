<script lang="ts" setup>
import type { FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';
import type { ToolbarNames } from 'md-editor-v3';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

definePageMeta({
	validate: async (route) => {
		console.log('用户数据', route.params);
		return true;
	},
});

const toolbars = ref<ToolbarNames[]>([
	'bold',
	'underline',
	'italic',
	'-',
	'strikeThrough',
	'title',
	'sub',
	'sup',
	'quote',
	'unorderedList',
	'orderedList',
	'task',
]);
const ruleFormRef = templateRef('ruleFormRef');
const upload = templateRef('upload');
const { data } = await useAsyncData('userinfo', () => findUser());
const formData = reactive<CreateUserDto>(
	data.value?.data ?? {
		avatar_url: '',
		user_name: '',
		pet_name: '',
		password: '',
		sign: '',
		describe: '',
	},
);
const imageFile = ref<FormData | null>(new FormData());
const updateUserRules = reactive<FormRules>({
	user_name: [
		{
			required: true,
			message: '请输入用户名',
			trigger: 'blur',
		},
	],
	password: [
		{
			required: true,
			validator: (_rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else if (!REGEXP_PWD.test(value)) {
					callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'));
				} else {
					callback();
				}
			},
			trigger: 'blur',
		},
	],
	pet_name: [
		{
			required: true,
			message: '请输入昵称',
			trigger: 'blur',
		},
	],
	sign: [
		{
			required: true,
			message: '请输入个性签名',
			trigger: 'blur',
		},
	],
	describe: [
		{
			required: true,
			message: '请输入个人简介',
			trigger: 'blur',
		},
	],
	avatar_url: [
		{
			required: true,
			message: '请上传头像',
			trigger: 'blur',
		},
	],
});

// 移除当前图片
const handleRemove = () => {
	formData.avatar_url = '';
	imageFile.value = null;
	upload.value!.clearFiles();
};

// 上传成功
const handleAvatarSuccess = (uploadFile: UploadFile, _uploadFiles: UploadFiles) => {
	formData.avatar_url = URL.createObjectURL(uploadFile.raw!);
	imageFile.value = new FormData();
	imageFile.value.append('file', uploadFile.raw!);
};

// 保存
const updateUser = async (formEl: FormInstance | undefined): Promise<void> => {
	formEl?.validate(async (valid) => {
		if (valid) {
			// 上传头像
			if (!formData.avatar_url) {
				const { data, msg } = await uploadAvatar(imageFile.value!);

				if (!data) {
					ElMessage({
						type: 'error',
						message: msg,
					});
					return;
				}

				formData.avatar_url = data.url;
			}

			const { data: resData, msg: resMsg } = await updataUserInfo(formData);

			ElMessage({
				type: resData ? 'success' : 'error',
				message: resMsg,
			});
		}
	});
};
</script>

<template>
	<div class="h-full w-full">
		<h3 class="mb-2 font-bold">个人信息</h3>
		<ElForm ref="ruleFormRef" :model="formData" :rules="updateUserRules" label-width="auto"
			class="grid w-full grid-cols-1 gap-x-0 sm:grid-cols-2 sm:gap-x-4">
			<ElFormItem label="头像" prop="avatar_url">
				<ElUpload ref="upload" class="relative" action="#" list-type="picture-card" :auto-upload="false"
					:show-file-list="false" :limit="1" :on-change="handleAvatarSuccess">
					<!-- 上传后显示图片 -->
					<template v-if="formData.avatar_url">
						<div class="group absolute h-full w-full" @click.stop>
							<ElImage :src="formData.avatar_url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
								:preview-src-list="[formData.avatar_url]" show-progress fit="cover" />
							<Icon
								class="absolute right-1 top-1 cursor-pointer text-[20px] text-admin-tag-active-text transition sm:opacity-0 sm:group-hover:text-admin-tag-active-text sm:group-hover:opacity-100"
								icon="mdi:close" @click="handleRemove" />
						</div>
					</template>
					<!-- 上传前显示加号 -->
					<template v-else>
						<Icon class="text-[40px] text-gray-400" icon="mdi:add" />
					</template>
				</ElUpload>
			</ElFormItem>
			<ElFormItem label="名字" class="flex items-start" prop="user_name">
				<ElInput v-model="formData.user_name" placeholder="请输入名字" clearable />
			</ElFormItem>
			<ElFormItem label="昵称" prop="pet_name">
				<ElInput v-model="formData.pet_name" placeholder="请输入昵称" clearable />
			</ElFormItem>
			<ElFormItem label="密码" prop="password">
				<ElInput v-model="formData.password" type="password" placeholder="请输入密码" clearable />
			</ElFormItem>
			<ElFormItem label="签名" prop="sign">
				<ElInput v-model="formData.sign" placeholder="请输入签名" clearable />
			</ElFormItem>
			<ElFormItem class="save">
				<ElButton type="primary" @click="updateUser(ruleFormRef!)">保存</ElButton>
			</ElFormItem>
			<ElFormItem label="简介" class="col-span-1 sm:col-span-2" prop="describe">
				<ClientOnly>
					<MdEditor v-model="formData.describe" :preview="false"
						:theme="useJojoColorMode().darkMode.preference" :toolbars="toolbars" />
				</ClientOnly>
			</ElFormItem>
		</ElForm>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-form-item__label) {
	@apply text-[16px];
}

:deep(.el-input__wrapper) {
	@apply h-[34px] text-[14px];
}

:deep(.el-select__wrapper) {
	@apply h-[34px] text-[14px];
}

:deep(.el-upload-dragger) {
	@apply h-[200px] w-[200px];
}

:deep(.save .el-form-item__content) {
	@apply flex justify-end;
}
</style>
