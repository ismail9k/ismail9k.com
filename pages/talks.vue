<script setup>
const talks = [
  {
    title: 'How I Skip 90% of Technical Interviews with Open Source',
    description: 'How I\'ve been hired multiple times without going through traditional technical interviews - all thanks to open source contributions and building in public! From building Vue.js components to landing dream jobs through GitHub visibility alone.',
    date: 'Jul 21, 2025',
    location: 'Supabase Meetup Istanbul',
    videoId: 'yn1V_Bl0dPg',
    language: 'English'
  },
  {
    title: 'Crypto And Blockchain Technologies',
    description: 'Unlock the fundamentals of blockchain and cryptocurrency with our comprehensive lecture. Dive into the evolution of cryptography, understand the mechanics behind Bitcoin\'s blockchain security, and explore the innovative concepts of smart contracts and the proof-of-stake consensus mechanism.',
    date: 'Feb 24, 2024',
    location: 'Ibtikar Conference',
    videoId: '47SFGvShMFE',
    language: 'Arabic'
  },
  {
    title: 'Frontend Development Deep Dive',
    description: 'Deep dive into frontend development covering how browsers work, browser pipeline and performance, frontend frameworks (Vue.js, React, Angular, Svelte), micro-frontend architecture, and the future of JavaScript. A comprehensive discussion with industry experts.',
    date: 'Jun 18, 2023',
    location: 'Tech & Coffee Podcast',
    videoId: 'PIZDHaYSLN4',
    language: 'Arabic'
  }
]
</script>

<template>
  <Layout>
    <section class="section">
      <h2 class="main-title">Talks</h2>
      <div class="main-description">
        A collection of talks and presentations I've given on various technical topics.
      </div>
    </section>
    <section class="section">
      <TalkCard v-for="talk in talks" :key="talk.videoId" v-bind="talk" />
    </section>
  </Layout>
</template>

