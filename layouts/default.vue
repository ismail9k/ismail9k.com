<template>
  <div class="layout">
    <VitePwaManifest />
    <BlurredCircles />
    <the-navbar />

    <main class="main">
      <slot></slot>
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

.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: $padding[5];
  justify-content: center;

  +tablet() {
    max-width: 100%;
    padding: $padding[2];
  }
}

.section {
  display: flex;
  flex-direction: column;
  margin: $margin[7] 0;
}
</style>
