<template>
  <a v-bind="$attrs" class="btn">
    <slot />
  </a>
</template>

<style lang="css">


.btn {
  border-color: var(--gray-color);
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: var(--spacing-2) (var(--spacing-4));
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;
  border-color: currentColor;
  text-decoration: none;
  background-color: var(--white-color-alpha-20);
}

.btn:not(:hover) {
  color: var(--theme-text-color) !important;
}
</style>