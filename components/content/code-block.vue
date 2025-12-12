<script setup lang="ts">
interface Props {
	lang?: string;
	filename?: string;
	copyable?: boolean;
}

const { lang = 'text', filename, copyable = true } = defineProps<Props>();

const copied = ref(false);
</script>

<template>
	<div class="code-block-container">
		<div v-if="filename || copyable" class="code-header">
			<div class="code-info">
				<span class="code-lang">{{ lang }}</span>
				<span v-if="filename" class="code-filename">{{ filename }}</span>
			</div>
			<button v-if="copyable" class="copy-button">
				{{ copied ? 'Copied!' : 'Copy' }}
			</button>
		</div>

		<pre class="code-content-wrapper"><code class="code-content"><slot /></code></pre>
	</div>
</template>

<style scoped>
.code-block-container {
	position: relative;
	margin: 16px 0;
	border-radius: 8px;
	overflow: hidden;
	background-color: #1e293b;
	border: 1px solid #334155;
}

.code-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 16px;
	background-color: #334155;
	border-bottom: 1px solid #475569;
}

.code-info {
	display: flex;
	align-items: center;
	gap: 12px;
}

.code-lang {
	color: #94a3b8;
	font-size: 12px;
	font-weight: 500;
	text-transform: uppercase;
}

.code-filename {
	color: #e2e8f0;
	font-size: 13px;
	font-family: Consolas, Monaco, monospace;
}

.copy-button {
	background: none;
	border: 1px solid #475569;
	color: #94a3b8;
	padding: 4px 8px;
	border-radius: 4px;
	cursor: pointer;
	font-size: 12px;
	transition: all 0.2s ease;
}

.copy-button:hover {
	background-color: #475569;
}

.code-content-wrapper {
	font-family: Consolas, Monaco, 'Courier New', monospace;
	font-size: 14px;
	line-height: 1.5;
	padding: 16px;
	margin: 0;
	color: #e2e8f0;
	background-color: transparent;
	overflow: auto;
}
</style>
