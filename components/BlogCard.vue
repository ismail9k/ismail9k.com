<script setup>
import dayjs from 'dayjs';
const props = defineProps(['path', 'date', 'title', 'description']);
</script>


<template>
  <div class="blog-card-wrapper">
    <p class="blog-card-time">
      {{ dayjs(props.date).format('MMMM DD, YYYY') }}
    </p>
    <div class="blog-card-timeline"></div>
    <NuxtLink :key="props.path" :to="props.path" class="blog-card">
      <h3 class="blog-card-title">{{ props.title }}</h3>
      <p class="blog-card-description">{{ props.description }}</p>
    </NuxtLink>
  </div>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.blog-card-wrapper {
  position: relative;
  display: flex;
  gap: 20px;
  transition: $transition;

  +tablet() {
    gap: 10px;
  }
}

.blog-card-title {
  color: var(--theme-text-color);
  margin-top: 0;
  transition: $transition;
}

.blog-card-time {
  white-space: nowrap;
  width: 100px;
  flex-shrink: 0;
  text-align: right;
  font-size: 12px;
  margin-top: $margin[6];
  margin-right: $margin[7];
  font-weight: bold;

  +tablet() {
    top: 30px;
    left: 0;
    background-color: $theme-bg-color;
    position: absolute;
    transform: rotate(90deg);
    transform-origin: left;
    padding: 0 $padding[1];
    margin: $margin[0];
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
    top: $margin[6];
    left: 0;
    content: ' ';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: @width;
    border-width: 2px;
    border-style: solid;
    border-color: var(--dark-color-alpha-20);
    transform: translateY(5px);
  }

  &::after {
    position: absolute;
    top: $margin[6];
    transform: translateY(15px);
    left: 4px;
    content: ' ';
    display: block;
    width: 1px;
    height: calc(100% - 10px);
    background-color: var(--dark-color-alpha-20);
    margin-inline-start: 0.5px;
  }

  +darkMode() {
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
  padding: $padding[6] ($padding[7]);
  text-decoration: none;
  border-radius: 15px;
  cursor: pointer;
  color: var(--theme-text-color);
  width: 100%;

  &:hover {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: 0 1px 3px var(--glass-shadow);

    .blog-card-title {
      color: var(--accent-color);
    }
  }


  +tablet() {
    padding: $padding[3] ($padding[4]);
  }
}

.blog-card-description {
  margin: 0;
  color: var(--dark-color-lighten-30);
  text-align: justify;
  font-weight: normal;

  +darkMode() {
    color: var(--white-color-darken-30);
  }
}
</style>