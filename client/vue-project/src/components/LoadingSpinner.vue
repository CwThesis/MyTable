<script setup lang="ts"></script>

<template>
<div class="spinnerContainer">
  <div class="spinner">
    <div class="shape1"></div>
    <div class="shape2"></div>
    <div class="shape3"></div>
    <div class="shape4"></div>
    <div class="shape5"></div>
  </div>
</div>
</template>

<style>
.spinnerContainer {
  display: grid;
  place-items: center;
  background-color: #1b1b49;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.spinner {
  display: flex;
  gap: 0.275rem;
  width: 3rem;
  height: 3rem;
}

.spinner div {
  background: #f9f9f9;
  width: 0.375rem;
  animation: bounce 1.1s infinite ease-in-out;
}

@keyframes bounce {

  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
  }
}

.spinner .shape2 {
  animation-delay: -1s;
}

.spinner .shape3 {
  animation-delay: -0.9s;
}

.spinner .shape4 {
  animation-delay: -0.8s;
}

.spinner .shape5 {
  animation-delay: -0.7s;
}
</style>