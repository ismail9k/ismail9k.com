<script setup>
const query = { path: '/blog', limit: 10, sort: [{ date: -1 }] };
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
      <ContentList :query="query" v-slot="{ list }">
        <BlogCard v-for="blog in list" :key="blog._path" :data="blog" />
      </ContentList>
    </section>
  </Layout>
</template>
