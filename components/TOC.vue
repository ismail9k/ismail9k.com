<script setup>
const { links } = defineProps(['links']);
const currentlyActiveToc = ref('');
const visibleSections = ref(new Map()); // Use Map to track visible entries

let observer = null;

onMounted(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
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
    <template v-for="link of links" :key="link.id">
      <div
        :class="['toc-item', { 'is-active': currentlyActiveToc === link.id }]"
      >
        <nuxt-link class="toc-item-text" :to="`#${link.id}`">
          {{ link.text }}
        </nuxt-link>
      </div>

      <div
        :class="[
          'toc-item',
          'is-sub-item',
          { 'is-active': currentlyActiveToc === child.id },
        ]"
        v-for="child of link.children"
        :key="child.id"
      >
        <nuxt-link :to="`#${child.id}`" class="toc-item-text">
          {{ child.text }}
        </nuxt-link>
      </div>
    </template>
  </aside>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.toc {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  padding: $p[5];

  +tablet() {
    display: none;
  }
}

.toc-item {
  transition: margin 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  display: block;
  width: 14px;
  height: 1.5px;
  background: $gray;
  margin: $m[5] 0;
  transform-origin: -2px 0;

  &.is-active {
    background: $accent;
    transform: scaleX(1.3);
    height: 1.75px;
    margin: $m[7] 0;
  }

  &.is-sub-item {
    width: 8px;
  }
}

.toc-item-text {
  display: none;
  font-size: $text[2];
  color: $dark-gray;
  font-weight: normal;

  .is-active & {
    color: $accent;
    font-weight: bold;

    +darkMode() {
      color: $accent;
    }
  }

  .is-sub-item & {
    margin-inline-start: $m[4];
    font-size: $text[1];
  }

  +darkMode() {
    color: $white;
  }
}

.toc:hover {
  .toc-item {
    width: auto;
    height: auto;
    margin: $m[1] ($m[0]);
    transform: scaleX(1);
    background: transparent;
  }

  .toc-item-text {
    display: block;
  }
}
</style>