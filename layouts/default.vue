<template>
  <div class="layout">
    <VitePwaManifest />

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

export default {
  components: { TheNavbar, TheFooter },
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
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding: $padding[5];

  +tablet() {
    max-width: clac(100% - ($padding[2] * 2));
    padding: $padding[2];
  }
}

.section {
  display: flex;
  flex-direction: column;
  margin: $margin[7] 0;
}
</style>
