<script setup>
const title = 'My Side-Quests'
const description = 'A collection of tools, apps, and open-source experiments I\'ve built along the way.'

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})

const projects = [
  {
    name: 'vue3-carousel',
    description: 'An open-source Vue 3 carousel library with smooth animations and customizable features.',
    link: 'https://github.com/ismail9k/vue3-carousel',
    icon: '📦',
    color: 'purple'
  },
  {
    name: 'aidoodles.app',
    description: 'An iOS app that transforms children\'s doodles into beautiful AI-generated artwork.',
    link: 'https://aidoodles.app',
    icon: '🎨',
    color: 'green'
  },
  {
    name: 'zaitoolbox.com',
    description: 'A curated archive of useful AI tools, helping you discover the best AI resources.',
    link: 'https://zaitoolbox.com',
    icon: '🤖',
    color: 'blue'
  },
]
</script>

<template>
  <h1 class="title">My Side-Quests</h1>
  <p class="subtitle">
    A collection of tools, apps, and open-source experiments I've built along the way.
  </p>

  <div class="tools-grid">
    <a v-for="project in projects" :key="project.name" :href="project.link" target="_blank" rel="noopener noreferrer"
      class="tool-card" :class="project.color">
      <div class="tool-content">
        <div class="tool-icon">
          {{ project.icon }}
        </div>
        <h2 class="tool-title">
          {{ project.name }}
        </h2>
        <p class="tool-description">{{ project.description }}</p>
        <div class="try-now">
          <span class="try-text">Try it now</span>
          <span class="arrow">→</span>
        </div>
      </div>
    </a>
  </div>
</template>

<style>
:root {
  --purple-gradient: linear-gradient(135deg, #9333ea, #7c3aed);
  --blue-gradient: linear-gradient(135deg, #3b82f6, #2563eb);
  --green-gradient: linear-gradient(135deg, #10b981, #059669);
}

.subtitle {
  font-size: 1.25rem;
  margin-bottom: 3rem;
}

.tools-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(1, 1fr);
}

.tool-card {
  border-radius: 1.5rem;
  padding: 2rem;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.tool-card {
  &.purple {
    background: var(--purple-gradient);
  }

  &.blue {
    background: var(--blue-gradient);
  }

  &.green {
    background: var(--green-gradient);
  }
}

.tool-card:hover {
  transform: translateY(-4px);
}

.tool-card:hover .arrow {
  transform: translateX(4px);
}

.tool-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
}

.tool-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

.tool-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

.try-now {
  margin-top: auto;
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.arrow {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

@media (min-width: 768px) {
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>