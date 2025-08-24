<script setup>
const talks = [
  {
    title: 'Career Journey and the Future of Software Development',
    description: 'A comprehensive discussion about my journey from graphic design to software engineering, working with open-source projects like Vue.js components, and insights into how AI is transforming the development landscape. Topics include working at different company scales (startups vs enterprises), the importance of soft skills, prompt engineering, and practical advice for junior developers in the AI era.',
    date: '22/08/2025',
    location: 'Live Podcast',
    videoId: '5IxpqPK1LlU',
    language: 'Arabic'
  },
  {
    title: 'How I Skip 90% of Technical Interviews with Open Source',
    description: 'How I\'ve been hired multiple times without going through traditional technical interviews - all thanks to open source contributions and building in public! From building Vue.js components to landing dream jobs through GitHub visibility alone.',
    date: '21/07/2025',
    location: 'Supabase Meetup Istanbul',
    videoId: 'yn1V_Bl0dPg',
    language: 'English'
  },
  {
    title: 'Crypto And Blockchain Technologies',
    description: 'Unlock the fundamentals of blockchain and cryptocurrency with our comprehensive lecture. Dive into the evolution of cryptography, understand the mechanics behind Bitcoin\'s blockchain security, and explore the innovative concepts of smart contracts and the proof-of-stake consensus mechanism.',
    date: '24/02/2024',
    location: 'Ibtikar Conference',
    videoId: '47SFGvShMFE',
    language: 'Arabic'
  },
  {
    title: 'Frontend Development Deep Dive',
    description: 'Deep dive into frontend development covering how browsers work, browser pipeline and performance, frontend frameworks (Vue.js, React, Angular, Svelte), micro-frontend architecture, and the future of JavaScript. A comprehensive discussion with industry experts.',
    date: '18/06/2023',
    location: 'Tech & Coffee Podcast',
    videoId: 'PIZDHaYSLN4',
    language: 'Arabic'
  },
]

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const formattedTalks = talks.map(talk => ({
  ...talk,
  formattedDate: formatDate(talk.date)
}));
</script>

<template>
  <section class="section">
    <h2 class="main-title">Talks</h2>
    <div class="main-description">
      A collection of talks and presentations I've given on various technical topics.
    </div>
  </section>
  <section class="section">
    <TalkCard v-for="talk in formattedTalks" :key="talk.videoId" :title="talk.title" :description="talk.description"
      :date="talk.formattedDate" :location="talk.location" :video-id="talk.videoId" :language="talk.language" />
  </section>
</template>
