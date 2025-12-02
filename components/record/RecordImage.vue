<script lang="ts" setup>
const { userInfo } = storeToRefs(useBlogUserInfo());
</script>

<template>
	<img v-lazy="userInfo?.avatar_url" alt="个人履历" class="h-full w-full object-cover" />
</template>

<style lang="scss" scoped></style>
