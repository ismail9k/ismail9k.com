<script setup>
import dayjs from 'dayjs';
const props = defineProps(['data']);
</script>


<template>
  <div class="blog-card-wrapper">
    <p class="blog-card-time">
      {{ dayjs(props.data.date).format('MMMM DD, YYYY') }}
    </p>
    <div class="blog-card-timeline"></div>
    <a :key="props.data._path" :href="props.data._path" class="blog-card">
      <h3 class="blog-card-title">{{ props.data.title }}</h3>
      <p class="blog-card-description">{{ props.data.description }}</p>
    </a>
  </div>
</template>

<style lang="stylus" >
@import '../assets/stylus/config/_index.styl';

.blog-card-wrapper {
  display: flex;
  gap: 20px;
}

.blog-card-title {
  margin-top: 0;
}

.blog-card-description {
  margin: 0;
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
    border-color: alpha($dark, 10%);
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
    background-color: alpha($dark, 10%);
    margin-inline-start: 0.5px;
  }

  +dark() {
    &::before {
      border-color: alpha($white, 20%);
    }

    &::after {
      background-color: alpha($white, 20%);
    }
  }
}

.blog-card {
  position: relative;
  padding: $padding[6] ($padding[7]);
  text-decoration: none;
  border-radius: 15px;
  cursor: pointer;
  color: $dark;

  &:hover {
    background-color: alpha($dark, 10%);
  }

  +dark() {
    color: $white;

    &:hover {
      background-color: alpha($white, 20%);
    }
  }
}

.blog-card-description {
  color: light($dark, 20%);

  +dark() {
    color: darken($white, 20%);
  }
}
</style>