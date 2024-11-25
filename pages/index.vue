<script setup>
import socials from '/assets/data/socials.json';

const title = 'Ismail9k';
const description =
  "A personal blog, blend of my life's work, experiences, challenges, and thoughts, captured as they come. Join me on this introspective journey.";
useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
});

const filteredSocial = socials.filter(({ name }) =>
  ['github', 'youtube', 'twitter'].includes(name.toLowerCase())
);

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(5)
    .select('date', 'title', 'description', 'path')
    .all()
);
</script>

<template>
  <section class="section">
    <p class="font-3 mb-7">Hi, I'm</p>
    <h2 class="main-title">Abdelrahman Ismail</h2>
    <p class="main-description">
      You might know me as Ismail9k. I'm a seasoned Tech Lead with a passion for
      creating and writing about innovative solutions. As a content creator, I
      strive to share my technological insights, sparking dialogue and learning.
      <br />
      But above all else, I'm a proud father, treasuring the moments I spend
      nurturing my children.
      <br />
      Welcome to my world. Let's explore and grow together in this digital
      space.
    </p>
  </section>

  <section class="section">
    <h2 class="title">Fine me online:</h2>
    <div class="social-row">
      <SocialCard
        v-for="social in filteredSocial"
        :key="social.name"
        :data="social"
      />
    </div>
  </section>

  <section class="section">
    <h2 class="title">Recent Blog:</h2>
    <BlogCard v-for="blog in posts" :key="blog.path" v-bind="blog" />
  </section>
</template>

<style lang="stylus" >
@import '../assets/stylus/config/_index.styl';

.social-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.section {
  flex: 1;
}
</style>