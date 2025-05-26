<script lang="ts" setup></script>

<template>
	<div class="w-full">
		<section
			class="flex h-[calc(100dvh-(5rem+110px))] w-full items-center justify-center font-serif sm:h-[calc(100dvh-(5rem+80px))]"
		>
			<div class="container mx-auto">
				<div class="flex justify-center">
					<slot name="error"></slot>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped></style>
