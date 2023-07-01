<template>
  <div>
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
