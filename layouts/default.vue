<template>
  <div class="layout">
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
  padding: 40px;

  +tablet() {
    margin: 5px;
  }

  +darkMode() {
    color: $white;
  }
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: $margin[10];
}
</style>
