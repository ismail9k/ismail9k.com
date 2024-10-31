<script setup>
const props = defineProps(['links']);

const currentlyActiveToc = ref('');
const visibleSections = ref(new Map()); // Use Map to track visible entries

let observer;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleSections.value.set(entry.target, entry);
      } else {
        visibleSections.value.delete(entry.target);
      }
    });
    const visibleEntries = [...visibleSections.value.values()].sort(
      (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
    );

    if (visibleEntries.length > 0) {
      currentlyActiveToc.value = visibleEntries[0].target.getAttribute('id');
    }
  }, options);

  document
    .querySelectorAll('.blog-content :is(h2[id], h3[id])')
    .forEach((subtitle) => {
      observer.observe(subtitle);
    });
});

onBeforeUnmount(() => observer.disconnect());
</script>

<template>
  <aside class="toc">
    <div class="toc-guide">
      <div v-for="link of props.links" :key="link.id">
        <nuxt-link
          :to="`#${link.id}`"
          :class="['toc-bar', { 'is-active': currentlyActiveToc === link.id }]"
        >
          <span class="sr-only">{{ link.text }}</span>
        </nuxt-link>

        <div
          :class="[
            'toc-sub-bar',
            { 'is-active': currentlyActiveToc === child.id },
          ]"
          v-for="child of link.children"
          :key="child.id"
        >
          <nuxt-link :to="`#${child.id}`">
            <span class="sr-only">{{ child.text }}</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.toc {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  padding: $p[5];

  +tablet() {
    display: none;
  }
}

.toc-item > a {
  font-size: $text[3];
  text-decoration: none;
  display: block;
  line-height: 2;
}

.toc-bar, .toc-sub-bar {
  display: block;
  width: 14px;
  height: 1.5px;
  background: $gray;
  margin: $m[5] 0;
  transition: $transition;
  transform-origin: -2px 0;

  &.is-active {
    background: $accent;
    transform: scaleX(1.3);
    margin: $m[7] 0;
  }
}

.toc-sub-bar {
  width: 8px;
}
</style>