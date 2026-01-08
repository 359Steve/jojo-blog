<script setup lang="ts">

</script>

<template>
	<strong v-bind="$attrs" class="
      font-semibold
      text-blog-emphasis
    ">
		<slot mdc-unwrap="strong" />
	</strong>
</template>

<style scoped></style>
