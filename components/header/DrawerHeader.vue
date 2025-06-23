<script lang="ts" setup>
import Bilibili from '../footer/utils/bilibili';

const { drawer } = storeToRefs(useJojoHeader());
</script>

<template>
	<Teleport to="body">
		<div class="jojo-drawer relative">
			<ElDrawer v-model="drawer" size="70%" direction="ltr">
				<div class="absolute right-0 top-0 flex h-8 w-8 items-center justify-center text-[#8a8a8a] hover:cursor-pointer hover:text-black"
					@click="drawer = false">
					<Icon icon="ri:close-fill" class="text-2xl" />
				</div>
				<div>
					<ul>
						<li class="h-16 w-full p-4">
							<div class="flex h-full w-full items-center justify-center">
								<LogoBasicLogo></LogoBasicLogo>
								<span class="overflow-hidden text-ellipsis whitespace-nowrap text-2xl font-bold">·Josef
									Joestar</span>
							</div>
						</li>
						<li class="p-2 text-center">
							<p>人类会舍弃某些事物·继续前进，还是说，要拾起过往·走回弯路呢？</p>
							<p>Gyro Zeppeli</p>
						</li>
					</ul>
				</div>
				<div></div>
				<div class="py-4">
					<HeaderMenuList></HeaderMenuList>
				</div>
				<div class="absolute bottom-0 left-0 flex h-10 w-full items-center justify-center gap-2 py-2">
					<Bilibili />
				</div>
			</ElDrawer>
		</div>
	</Teleport>
</template>

<style lang="scss" scoped>
.jojo-drawer {
	:deep(header) {
		display: none;
	}
}
</style>
