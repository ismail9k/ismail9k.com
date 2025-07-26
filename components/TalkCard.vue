<script setup>
const props = defineProps(['title', 'description', 'date', 'location', 'videoId', 'language']);
const { trackTalkClick } = useTracking();

const handleTalkClick = () => {
  trackTalkClick(props.title, props.videoId, props.location);
};
</script>

<template>
  <div class="talk-card-wrapper">
    <p class="talk-card-time">
      {{ props.date }}
    </p>
    <div class="talk-card-timeline"></div>
    <a :href="`https://www.youtube.com/watch?v=${props.videoId}`" target="_blank" rel="noopener noreferrer" class="talk-card" @click="handleTalkClick">
      <h3 class="talk-card-title">{{ props.title }}</h3>
      <p class="talk-card-description">{{ props.description }}</p>
      <div class="talk-card-meta">
        <span class="talk-location">📍&nbsp;{{ props.location }}</span>
        <span class="talk-language">🌍&nbsp;{{ props.language }}</span>
      </div>
    </a>
  </div>
</template>

<style lang="css">
.talk-card-wrapper {
  position: relative;
  display: flex;
  gap: var(--spacing-10);
  transition: var(--transition);

  @media screen and (max-width: 991px) {
    gap: var(--spacing-7);
  }
}

.talk-card-title {
  color: var(--theme-text-color);
  margin-top: 0;
  transition: var(--transition);
}

.talk-card-time {
  white-space: nowrap;
  width: 100px;
  flex-shrink: 0;
  text-align: right;
  font-size: 12px;
  margin-top: var(--spacing-10);
  margin-right: var(--spacing-7);
  font-weight: bold;
  color: var(--dark-gray-color);

  @media screen and (max-width: 991px) {
    top: var(--spacing-15);
    left: 0;
    background-color: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    position: absolute;
    transform: rotate(90deg);
    transform-origin: left;
    padding: 0 var(--spacing-5);
    margin: 0;
    z-index: 1;
    width: auto;
    color: var(--accent-color);
  }
}

.talk-card-timeline {
  position: relative;
  transform: translateX(-5px);

  &::before {
    position: absolute;
    top: var(--spacing-10);
    left: 0;
    content: ' ';
    display: block;
    width: 6px;
    height: 6px;
    border-width: 2px;
    border-style: solid;
    border-color: var(--dark-color-alpha-20);
    transform: translateY(5px);
  }

  &::after {
    position: absolute;
    top: var(--spacing-10);
    transform: translateY(15px);
    left: 4px;
    content: ' ';
    display: block;
    width: 1px;
    height: calc(100% - 10px);
    background-color: var(--dark-color-alpha-20);
    margin-inline-start: 0.5px;
  }

  .dark & {
    &::before {
      border-color: var(--white-color-alpha-20);
    }

    &::after {
      background-color: var(--white-color-alpha-20);
    }
  }
}

.talk-card {
  display: block;
  position: relative;
  padding: var(--spacing-10);
  text-decoration: none;
  border-radius: 15px;
  cursor: pointer;
  color: var(--theme-text-color);
  width: 100%;

  > p {
    display: block;
    margin: 0;
  }

  &:hover {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: 0 1px 3px var(--glass-shadow);

    .talk-card-title {
      color: var(--accent-color);
    }
  }

  @media screen and (max-width: 991px) {
    padding: var(--spacing-7);
  }
}

.talk-card-description {
  margin: 0 0 var(--spacing-5) 0;
  color: var(--dark-color-lighten-30);
  text-align: justify;
  font-weight: normal;

  .dark & {
    color: var(--white-color-darken-30);
  }
}

.talk-card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-5);
  margin-top: var(--spacing-5);
}

.talk-location {
  font-size: 0.875rem;
  color: var(--dark-color-lighten-30);
  font-weight: 500;

  .dark & {
    color: var(--white-color-darken-30);
  }
}

.talk-language {
  font-size: 0.875rem;
  color: var(--accent-color);
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  background: var(--accent-color-alpha-10);
  border-radius: 0.75rem;
}
</style>