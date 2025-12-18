<script lang="ts" setup>
const { userInfo } = storeToRefs(useBlogUserInfo());
</script>

<template>
	<NuxtImg :src="userInfo?.avatar_url" alt="个人履历" class="h-full w-full object-cover" loading="lazy" />
</template>

<style lang="scss" scoped></style>
