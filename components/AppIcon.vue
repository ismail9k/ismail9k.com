<script setup>
import icons from '../assets/data/icons.json';
const props = defineProps({
  name: String,
  size: String,
  color: String,
  title: String,
  desc: String,
});

const path = computed(() => icons[props.name]);
const styleClasses = [props.size, props.color].map((val) => val && `is-${val}`);
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    class="icon"
    :class="styleClasses"
    v-bind="$attrs"
    v-on="listeners"
    role="img"
  >
    <title>{{ props.title || props.name }}</title>
    <desc v-if="props.desc">{{ props.desc }}</desc>
    <path :d="path" />
  </svg>
</template>

<style>
/* default */
.icon {
  width: 1.2em;
  height: 1.2em;
  fill: currentColor;
}
/* sizes */
.icon.is-large {
  width: 2em;
  height: 2em;
}
.icon.is-medium {
  width: 1.6em;
  height: 1.6em;
}
.icon.is-normal {
  width: 1.2em;
  height: 1.2em;
}
.icon.is-small {
  width: 1em;
  height: 1em;
}
.icon.is-tiny {
  width: 0.8em;
  height: 0.8em;
}
/* colors */
.icon.is-primary,
.icon.is-blue {
  fill: #2196f3;
}
.icon.is-success,
.icon.is-green {
  fill: #4caf50;
}
.icon.is-danger,
.icon.is-red {
  fill: #f44336;
}
.icon.is-warning,
.icon.is-orange {
  fill: #ff9800;
}
</style>
