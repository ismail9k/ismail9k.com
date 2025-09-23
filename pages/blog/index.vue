<script setup>
const title = 'Blog - Ismail9k';
const description = 'Technical articles, tutorials, and insights about web development, CSS, JavaScript, Vue.js, and modern software engineering practices.';

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
  ],
});

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(15)
    .select('date', 'title', 'description', 'path')
    .all()
);
</script>

<template>
  <section class="section">
    <h2 class="main-title">Blog</h2>
    <div class="main-description">
      Welcome to my blog - a blend of my life's work, experiences, challenges,
      and thoughts, captured as they come. Join me on this introspective
      journey.
    </div>
  </section>
  <section class="section">
    <BlogCard v-for="blog in posts" :key="blog.path" v-bind="blog" />
  </section>
</template>
