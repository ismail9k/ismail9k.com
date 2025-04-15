<script setup>
const props = defineProps(['data']);
</script>


<template>
  <a class="social-card" :style="`color: ${props.data.color};`" :href="props.data.link" target="_blank">
    <app-icon :name="props.data.icon" />
    <span>{{ props.data.name }}</span>
  </a>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.social-card {
  border-radius: 8px;
  padding: $padding[1] ($padding[4]);
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;
  text-decoration: none;
  background-color: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  box-shadow: 0 1px 3px var(--glass-shadow);
}

.social-card:not(:hover) {
  color: var(--theme-text-color) !important;
}
</style>