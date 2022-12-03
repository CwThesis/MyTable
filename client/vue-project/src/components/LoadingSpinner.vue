<script setup lang="ts"></script>

<template>
<div class="loader-container">
<div class="loader">
<img src="https://cdn.dribbble.com/users/2140642/screenshots/4301537/media/c0336297531a44070650a44bbb0961b9.gif">
</div>
</div>
</template>

<style>

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70vh;
}

.loader {
  position: fixed;
	width: 80vw;
	height: 80vh;
	
	z-index: 999;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
