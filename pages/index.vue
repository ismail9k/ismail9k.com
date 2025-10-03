<script setup>
import socials from '/assets/data/socials.json';

const title = 'Ismail9k - Abdelrahman Ismail';
const description =
  'Software engineer and technical team lead specializing in TypeScript, Vue.js, React, and GoLang. Creator of vue3-carousel and contributor to open-source projects. Sharing insights on web development, AI, and 9k-level programming tips.';
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
  ['github', 'x'].includes(name.toLowerCase())
);

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(3)
    .select('date', 'title', 'description', 'path', 'tags')
    .all()
);
</script>

<template>
  <section class="section">
    <p class="font-3 mb-7">Hi, I'm</p>
    <h2 class="main-title">Abdelrahman Ismail</h2>
    <div class="main-description">
      <p>
        A software engineer and technical team lead based in Istanbul. With over
        a decade of experience in tech, I've built and guided teams to deliver
        high-impact solutions. I work with diverse technologies including
        TypeScript, Node.js, Vue.js, React, and GoLang, and have contributed to
        projects across e-commerce, gaming, and dropshipping industries.
      </p>
      <p>
        I'm also active in the open-source community, best known for my library,
        vue3-carousel. Passionate about team collaboration, continuous learning,
        and emerging technologies like decentralized systems, NFTs, and AI, I
        blend technical expertise with strategic leadership to foster innovation
        and drive success in every project.
      </p>
      <p>
        Along my journey, I share technological insights, learnings, and my
        9k-level tips.
      </p>
    </div>
  </section>

  <section v-if="false" class="section">
    <h2 class="title">Fine me online:</h2>
    <div class="social-row">
      <SocialCard v-for="social in filteredSocial" :key="social.name" :data="social" />
    </div>
  </section>

  <section class="section">
    <h2 class="title">Recent Blog:</h2>
    <BlogCard v-for="blog in posts" :key="blog.path" v-bind="blog" />
  </section>
</template>

<style lang="css">
.social-row {
  display: flex;
  gap: 10px;
  width: 100%;
}

.section {
  flex: 1;
}
</style>