<script setup lang="ts">

</script>

<template>
	<strong v-bind="useAttrs" class="
      font-semibold
      text-gray-800
      dark:text-gray-200
    ">
		<slot mdc-unwrap="strong" />
	</strong>
</template>

<style scoped></style>
