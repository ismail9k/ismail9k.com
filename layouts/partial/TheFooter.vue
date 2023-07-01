<script setup>
const socials = [
  { name: 'github', link: 'https://github.com/ismail9k' },
  { name: 'linkedin', link: 'https://linkedin.com/in/ismail9k' },
  { name: 'twitter', link: 'https://twitter.com/ismail_9k' },
  { name: 'instagram', link: 'https://instagram.com/ismail9k' },
  { name: 'dev', link: 'https://dev.to/ismail9k' },
  // { name: 'mail', link: 'mailto:hello@ismail9k.com?Subject=Hello' },
  { name: 'tiktok', link: 'https://tiktok.com/@ismail.9k' },
  { name: 'youtube', link: 'https://youtube.com/@ismail9k' },
];
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
        >
          <AppIcon :name="social.name"></AppIcon>
        </a>
      </li>
    </ul>
  </footer>
</template>
