<script lang="ts" setup>
const findUsers = async () => {
	const user_name = useCookie('user_name').value;
	const token = useUserState().getToken();
	if (user_name && token) {
		const { data } = await findUser(user_name ?? '');
		data &&
			useUserinfo().setUserInfo({
				...data,
				tags: data.tags.map((item) => item.tag_id).filter(Boolean),
			});
	}
};

onBeforeMount(() => {
	useUserinfo().getUserInfo() ?? findUsers();
});
</script>

<template>
	<NuxtPage />
</template>

<style lang="scss" scoped></style>
