<script lang="ts" setup>
definePageMeta({
	middleware: 'admin',
});

const findUsers = async () => {
	const user_name = useCookie('user_name').value;
	const { data } = await findUser(user_name ?? '');
	data && useUserinfo().setUserInfo(data);
};

onBeforeMount(() => {
	useUserinfo().getUserInfo() ?? findUsers();
});
</script>

<template>
	<NuxtPage />
</template>

<style lang="scss" scoped></style>
