<script lang="ts" setup>
definePageMeta({
	middleware: 'admin',
});

const findUsers = async () => {
	const { data } = await findUser();
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
