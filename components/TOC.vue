<script>
export default {
  async asyncData({ $content, params }) {
    console.log('params', params);
    const article = await $content('blog', params.slug).fetch();
    console.log('article', article);

    return {
      article,
    };
  },
};
</script>

<template>
  <ul>
    <li
      v-for="link of article.toc"
      :key="link.id"
      :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
    >
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul>
</template>
