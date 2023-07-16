<script setup>
import socials from '/content/socials.json';
</script>


<template >
  <footer class="footer">
    <ul class="footer-list">
      <li v-for="social in socials" :key="social.name">
        <a
          class="footer-item"
          :href="social.link"
          target="_blank"
          rel="noopener"
          :style="`color: ${social.color}`"
        >
          <AppIcon :name="social.icon"></AppIcon>
        </a>
      </li>
    </ul>
  </footer>
</template>

<style lang="stylus">
@import '../../assets/stylus/config/_index.styl';

.footer {
  display: flex;
  justify-content: center;
  padding: $padding[10];
  margin-bottom: $margin[5];
}

.footer-list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-item {
  padding: 10px;
  color: $dark;
  font-size: $font-size[5];

  &:not(:hover) {
    color: $dark !important;

    +dark() {
      color: $white !important;
    }
  }
}
</style>
