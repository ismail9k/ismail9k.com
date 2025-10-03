<script setup>
import dayjs from 'dayjs';
const props = defineProps(['path', 'date', 'title', 'description', 'tags']);
const { trackBlogClick } = useTracking();

const handleBlogClick = () => {
  trackBlogClick(props.title, props.path);
};
</script>


<template>
  <div class="blog-card-wrapper">
    <p class="blog-card-time">
      {{ dayjs(props.date).format('MMMM DD, YYYY') }}
    </p>
    <div class="blog-card-timeline"/>
    <NuxtLink :key="props.path" :to="props.path" class="blog-card" @click="handleBlogClick">
      <h3 class="blog-card-title">{{ props.title }}</h3>
      <p class="blog-card-description">{{ props.description }}</p>
      <div v-if="props.tags && props.tags.length > 0" class="blog-card-tags">
        <span v-for="tag in props.tags" :key="tag" class="blog-card-tag">
          {{ tag }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="css">
.blog-card-wrapper {
  position: relative;
  display: flex;
  gap: var(--spacing-10);
  transition: var(--transition);

  @media screen and (max-width: 991px) {
    gap: var(--spacing-7);
  }
}

.blog-card-title {
  color: var(--theme-text-color);
  margin-top: 0;
  transition: var(--transition);
}

.blog-card-time {
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

.blog-card-timeline {
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

.blog-card {
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

    .blog-card-title {
      color: var(--accent-color);
    }
  }


  @media screen and (max-width: 991px) {
    padding: var(--spacing-7);
  }
}

.blog-card-description {
  margin: 0;
  color: var(--dark-color-lighten-30);
  text-align: justify;
  font-weight: normal;

  .dark & {
    color: var(--white-color-darken-30);
  }
}

.blog-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-5);
  margin-top: var(--spacing-8);
}

.blog-card-tag {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-3) var(--spacing-6);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  color: var(--accent-color);
  background: var(--dark-color-alpha-05);
  border: 1px solid var(--dark-color-alpha-10);
  border-radius: 12px;
  transition: var(--transition);

  &::before {
    content: '#';
    margin-right: 2px;
    opacity: 0.6;
  }

  .blog-card:hover & {
    background: var(--dark-color-alpha-10);
    border-color: var(--accent-color);
    transform: translateY(-1px);
  }

  .dark & {
    color: var(--accent-color);
    background: var(--white-color-alpha-05);
    border-color: var(--white-color-alpha-15);
  }

  .dark .blog-card:hover & {
    background: var(--white-color-alpha-10);
    border-color: var(--accent-color);
  }
}
</style>