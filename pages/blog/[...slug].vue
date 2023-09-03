<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const currentlyActiveToc = ref('');
let observer;

onMounted(() => {
  const observerRoot = document.querySelector('.blog-content');

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        currentlyActiveToc.value = entry.target.getAttribute('id');
      });
    },
    { root: observerRoot, threshold: 0 }
  );

  document
    .querySelectorAll('.blog-content :is(h2[id], h3[id])')
    .forEach((section) => observer.observe(section));
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>


<template>
  <ContentDoc>
    <template #default="{ doc }">
      <h1 class="blog-title">{{ doc.title }}</h1>

      <div class="blog">
        <div class="blog-content">
          <ContentRenderer :value="doc"> </ContentRenderer>
        </div>
        <aside class="blog-toc">
          <div class="blog-toc-sticky">
            <h2>Table Of Content</h2>
            <ul class="blog-toc-list">
              <li
                v-for="link of doc.body?.toc?.links"
                :key="link.id"
                :class="[
                  'blog-toc-item',
                  { toc2: link.depth === 2, toc3: link.depth === 3 },
                ]"
              >
                <NuxtLink
                  :to="`#${link.id}`"
                  :class="{
                    'blog-toc-item--active': currentlyActiveToc === link.id,
                  }"
                  >{{ link.text }}</NuxtLink
                >
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </template>

    <template #empty>
      <p>No content found.</p>
    </template>

    <template #not-found>
      <div class="not-fount-wrapper">
        <p>Blog not found</p>
        <Btn href="/"> Back home </Btn>
      </div>
    </template>
  </ContentDoc>
</template>

<style lang="stylus">
@import '../assets/stylus/config/_index.styl';

.blog-toc-item--active {
  color: $accent;
}

.blog-toc {
  width: 30%;
  margin-inline-start: 5%;

  +tablet() {
    display: none;
  }
}

.blog-toc-sticky {
  position: sticky;
  top: 10px;
}

.blog-toc-list {
  padding-inline-start: 0;
}

.blog-toc-item {
  display: flex;
  list-style-type: none;
  font-size: $font-size[1];

  &::before {
    content: '└';
    padding: 0 5px;
    color: $accent;
    line-height: 2em;
  }
}

.blog-content {
  width: 70%;

  +tablet() {
    width: 100%;
  }
}

.blog {
  width: 100%;
  font-size: $font-size[4];
  line-height: 1.5;
  display: flex;

  img {
    max-width: 100%;
    margin: auto;
    display: block;
    border-radius: 8px;
    overflow: hidden;
    margin-top: $margin[10];
    margin-bottom: $margin[10];
  }
}

.blog-title {
  margin-top: 0;
  margin-bottom: $margin[10];
  font-size: $font-size[13];
  line-height: 1.5;
  max-width: 20ch;
  border-left: $padding[2] solid $accent;
  padding-left: $padding[5];

  +tablet() {
    font-size: $font-size[7];
  }
}

.not-fount-wrapper {
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
}

pre {
  overflow-x: auto;
  padding: $padding[4] ($padding[6]);
  border-radius: 8px;
  background: $gray;
  border: 1px solid $white;

  +darkMode() {
    background: $black;
    border-color: $dark-gray;
  }
}

blockquote {
  background: $gray;
  border-left: 10px solid $accent;
  margin: $margin[3] ($margin[0]);
  padding: $padding[4] ($padding[4]);
  quotes: '\201C' '\201D' '\2018' '\2019';
  color: inherit;

  &:before {
    color: $accent;
    content: open-quote;
    font-size: $font-size[10];
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  p {
    display: inline;
  }

  +darkMode() {
    color: $dark;
  }
}

hr {
  margin: ($margin[10] * 2) 0;
  border: 0;
  text-align: center;
  line-height: 1;

  &:after {
    content: '...';
    font-size: $font-size[6];
    letter-spacing: 10px;
  }
}
</style>