<script lang="ts" setup>
import avatar1 from '~/assets/image/index_bg.png';
import avatar2 from '~/assets/image/my.png';

const avatarUrl = computed((): string => {
	return useVueStarport().getAvatarUrl() === 'index_bg' ? avatar1 : avatar2;
});
</script>

<template>
	<img :src="avatarUrl" alt="个人履历" class="h-full w-full object-cover" />
</template>

<style lang="scss" scoped></style>
