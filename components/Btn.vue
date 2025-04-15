<template>
  <a v-bind="$attrs" class="btn">
    <slot />
  </a>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.btn {
  border-color: $gray;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: $padding[2] ($padding[4]);
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;
  border-color: currentColor;
  text-decoration: none;
  background-color: alpha($white, 20%);
}

.btn:not(:hover) {
  color: var(--theme-text-color) !important;
}
</style>