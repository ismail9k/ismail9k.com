<template>
  <div class="layout">
    <VitePwaManifest />
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

<script>
import TheNavbar from './partial/TheNavbar.vue';
import TheFooter from './partial/TheFooter.vue';
import BlurredCircles from '../components/BlurredCircles.vue';

export default {
  components: { TheNavbar, TheFooter, BlurredCircles },
};
</script>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';


.container {
  min-height: calc(100vh - 250px);
  padding: 1rem 2rem;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;


  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1rem;
  }
}

.section {
  display: flex;
  flex-direction: column;
  margin: $margin[7] 0;
}
</style>
