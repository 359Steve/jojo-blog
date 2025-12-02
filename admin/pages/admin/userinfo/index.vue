<script lang="ts" setup>
import type { FormInstance, FormRules, UploadFile, UploadFiles } from 'element-plus';
import type { ToolbarNames } from 'md-editor-v3';

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
const { data } = await useAsyncData('userinfo', () => {
	const user_name = useCookie('user_name').value;
	return findUser(user_name ?? '');
});
const formData = reactive(
	data.value?.data
		? {
			...data.value.data,
			tags: data.value.data.tags.map((item) => item.tag_id).filter(Boolean),
		}
		: {
			user_name: '',
			pet_name: '',
			password: '',
			sign: '',
			describe: '',
			avatar_url: '',
			tags: [],
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
					callback(new Error('密码长度在6到20之间，且包含大写字母、小写字母、数字和特殊字符'));
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
	tags: [
		{
			type: 'array',
			required: true,
			message: '请选择标签',
			trigger: 'change',
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
			if (imageFile.value && imageFile.value.has('file')) {
				const { data } = await uploadAvatar(imageFile.value);

				if (!data) {
					return;
				}

				formData.avatar_url = data.url;
			}

			const { data: resData } = await updataUserInfo(formData);

			if (resData) {
				const user_name = useCookie('user_name');
				user_name.value = resData.user_name;
				useUserinfo().setUserInfo({
					...resData,
					tags: formData.tags,
				});
			}
		}
	});
};
</script>

<template>
	<AdminFormMain title="个人信息">
		<ElForm ref="ruleFormRef" :model="formData" :inline="true" :rules="updateUserRules" label-width="auto">
			<div class="w-full">
				<ElFormItem label="头像：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="avatar_url">
					<ElUpload ref="upload" class="relative" action="#" list-type="picture-card" :auto-upload="false"
						:show-file-list="false" :limit="1" :on-change="handleAvatarSuccess">
						<!-- 上传后显示图片 -->
						<template v-if="formData.avatar_url">
							<div class="group absolute h-full w-full" @click.stop>
								<ElImage v-lazy="formData.avatar_url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
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
				<ElFormItem label="名字：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="user_name">
					<ElInput v-model="formData.user_name" placeholder="请输入名字" clearable />
				</ElFormItem>
				<ElFormItem label="昵称：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="pet_name">
					<ElInput v-model="formData.pet_name" placeholder="请输入昵称" clearable />
				</ElFormItem>
				<ElFormItem label="新密码：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="password">
					<ElInput v-model="formData.password" type="password" placeholder="请输入新密码" clearable />
				</ElFormItem>
				<ElFormItem label="签名：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="sign">
					<ElInput v-model="formData.sign" placeholder="请输入签名" clearable />
				</ElFormItem>
				<ElFormItem label="标签：" class="!mx-0 !w-full sm:!w-[50%] sm:odd:pr-4" prop="tags">
					<SelectTag :tags="formData.tags" type="PERSON" @tag-change="formData.tags = $event" />
				</ElFormItem>
				<ElFormItem class="save !mx-0 !w-full sm:pr-4">
					<ElButton type="primary" @click="updateUser(ruleFormRef!)">保存</ElButton>
				</ElFormItem>
			</div>

			<MdEditHeight>
				<template #default="{ height }">
					<ElFormItem label="简介：" class="!mx-0 !mb-0 h-full w-full" prop="describe">
						<ClientOnly>
							<MdEditor v-model="formData.describe" :preview="false"
								:theme="useJojoColorMode().darkMode.preference" :toolbars="toolbars"
								:style="{ height: `${height}px` }" />
						</ClientOnly>
					</ElFormItem>
				</template>
			</MdEditHeight>
		</ElForm>
	</AdminFormMain>
</template>

<style lang="postcss" scoped>
:deep(.el-form) {
	@apply flex flex-1 flex-col;
}

:deep(.el-select) {
	@apply w-full;
}
</style>
