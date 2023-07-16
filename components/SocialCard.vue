<script setup>
const props = defineProps(['data']);
</script>


<template>
  <a
    class="social-card"
    :style="`color: ${props.data.color};`"
    :href="props.data.link"
    target="_blank"
  >
    <app-icon :name="props.data.icon" />
    <span>{{ props.data.name }}</span>
  </a>
</template>

<style lang="stylus" >
@import '../assets/stylus/config/_index.styl';

.social-card {
  border-color: $gray;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  padding: $padding[1] ($padding[4]);
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;
  border-color: currentColor;
  text-decoration: none;
  background-color: transparent;

  +dark() {
    background-color: alpha($white, 20%);
  }
}

.social-card:not(:hover) {
  color: $dark !important;

  +dark() {
    color: $white !important;
  }
}
</style>