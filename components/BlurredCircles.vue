<template>
  <div class="blurred-circles">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
    <div class="circle circle-3"></div>
    <div class="circle circle-4"></div>
  </div>
</template>

<style scoped>
.blurred-circles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.2;
}

.circle-1 {
  width: 500px;
  height: 500px;
  background: #6366f1;
  top: -100px;
  left: -100px;
  animation: float 15s ease-in-out infinite;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: #8b5cf6;
  top: 50%;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.circle-3 {
  width: 300px;
  height: 300px;
  background: #ec4899;
  bottom: -50px;
  left: 20%;
  animation: float 25s ease-in-out infinite;
}

.circle-4 {
  width: 350px;
  height: 350px;
  background: #3b82f6;
  top: 30%;
  left: 40%;
  animation: float 18s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(30px, 30px) rotate(180deg);
  }

  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}
</style>