<script lang="ts" setup>
definePageMeta({
	middleware: 'admin',
});

const findUsers = async () => {
	const token = useUserState().getToken();
	if (token) {
		const { data } = await findUser();
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
