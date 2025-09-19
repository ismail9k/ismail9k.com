<template>
  <div class="github-embed">
    <div class="github-header">
      <img src="/github-logo.svg" alt="GitHub Logo" class="github-logo" >
      <a
        :href="`https://github.com/${repo}`"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        {{ repo }}
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  repo: {
    type: String,
    required: true,
  },
  noReadme: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.github-embed {
  display: flex;
  flex-direction: column;
  border: 1px solid #d1d5db; /* Neutral gray border */
  border-radius: 10px;
  background-color: #f9fafb; /* Light background */
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.github-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.github-logo {
  width: 32px;
  height: 32px;
  margin: 0 !important;
}

.github-link {
  font-size: 1.2rem;
  font-weight: 600;
  color: #0366d6;
  text-decoration: none;
}

.github-link:hover {
  text-decoration: underline;
}

.github-body {
  font-size: 1rem;
  color: #374151; /* Neutral gray text */
}

.no-readme-warning {
  color: #e53e3e; /* Red warning */
  font-weight: bold;
}

.readme-message {
  color: #2d3748; /* Dark gray */
  font-weight: 500;
}
</style>