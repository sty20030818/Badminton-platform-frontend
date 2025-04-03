<template>
	<div class="app-container">
		<router-view />
	</div>
</template>

<script setup></script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(243, 244, 246);
	}

	#app {
		width: 100%;
		min-height: 100vh;
		background-color: rgb(243, 244, 246);
	}

	.app-container {
		width: 100%;
		min-height: 100vh;
		background-color: rgb(243, 244, 246);
	}
</style>
