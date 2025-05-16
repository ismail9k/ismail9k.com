<script setup>
import socials from '/assets/data/socials.json';
</script>


<template>
  <footer class="footer">
    <ul class="footer-list">
      <li v-for="social in socials" :key="social.name">
        <a class="footer-item" :href="social.link" target="_blank" rel="noopener" :style="`color: ${social.color}`">
          <AppIcon :name="social.icon"></AppIcon>
        </a>
      </li>
    </ul>
  </footer>
</template>

<style lang="css">
.footer {
  display: flex;
  justify-content: center;
  padding: var(--spacing-10);
  margin-bottom: var(--spacing-5);
}

.footer-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-item {
  display: block;
  padding: var(--spacing-1);
  color: var(--dark-color);
  font-size: var(--text-size-5);
  cursor: pointer;

  &:not(:hover) {
    color: var(--theme-text-color) !important;
  }
}
</style>
