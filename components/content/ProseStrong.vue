<script setup lang="ts">

</script>

<template>
	<strong v-bind="$attrs" class="
      font-semibold
      text-[#222]
      dark:text-[#ddd]
    ">
		<slot mdc-unwrap="strong" />
	</strong>
</template>

<style scoped></style>
