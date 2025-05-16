<script setup>
import TheNavbar from './partial/TheNavbar.vue';
import TheFooter from './partial/TheFooter.vue';
import BlurredCircles from '../components/BlurredCircles.vue';

defineOgImageComponent('OGImage')
</script>

<template>
  <div class="layout">
    <BlurredCircles />
    <the-navbar />

    <main class="main">
      <div class="container">
        <slot></slot>
      </div>
    </main>

    <the-footer />
  </div>
</template>



<style lang="css">



.container {
  min-height: calc(100vh - 250px);
  padding: 1rem 2rem;
  width: 1000px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;


  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    padding: 1rem;
  }
}

.section {
  display: flex;
  flex-direction: column;
  margin: var(--spacing-7) 0;
}
</style>
