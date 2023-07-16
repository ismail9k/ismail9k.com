<script setup>
const socials = [
  {
    icon: 'github',
    name: 'Github',
    link: 'https://github.com/ismail9k',
    color: '#000000',
  },
  {
    icon: 'youtube',
    name: 'YouTube',
    link: 'https://youtube.com/@ismail9k',
    color: '#FF0000',
  },
];

const query = { path: '/blog', limit: 5, sort: [{ date: -1 }] };
</script>

<template>
  <Layout>
    <section class="section">
      <p class="subtitle">Hi, I'm</p>
      <h2 class="title font-7">Abdelrahman Ismail9k</h2>
      <p class="text">A tech lead, writer, contact-creator, and proud father</p>
    </section>

    <section class="section">
      <h2 class="title">Fine me online:</h2>
      <div class="social-row">
        <a
          v-for="social in socials"
          :key="social.name"
          class="social-card"
          :style="`color: ${social.color};`"
          :href="social.link"
          target="_blank"
        >
          <app-icon :name="social.icon" />
          <span>{{ social.name }}</span>
        </a>
      </div>
    </section>

    <section class="section">
      <h2 class="title">Blog:</h2>

      <ContentList :query="query" v-slot="{ list }">
        <a v-for="article in list" :key="article._path" :href="article._path">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </a>
      </ContentList>
    </section>
  </Layout>
</template>

<style lang="stylus" >
@import '../assets/stylus/config/_index.styl';

.social-row {
  display: flex;
  gap: 10px;
}

.social-card {
  background-color: $white;
  border-color: $gray;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  padding: $padding[2] ($padding[5]);
  display: flex;
  place-items: center;
  gap: 10px;
  cursor: pointer;

  +dark() {
    background-color: alpha($white, 50%);
  }
}

.social-card:not(:hover) {
  color: $secondary !important;

  +dark() {
    color: $white !important;
  }
}
</style>