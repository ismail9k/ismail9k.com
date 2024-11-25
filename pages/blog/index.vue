<script setup>
const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(10)
    .select('date', 'title', 'description', 'path')
    .all()
);
</script>

<template>
  <Layout>
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
  </Layout>
</template>
