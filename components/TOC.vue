<script setup>
const { parent, scrollMarginTop } = defineProps(['parent', 'scrollMarginTop']);

const headers = ref([]);
const activeHeader = ref('');

const THRESHOLD = 0;
let scrollAnimationFrame;

onMounted(() => {
  headers.value = getHeaders();
  window.addEventListener('scroll', onScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll, { passive: true });
  cancelAnimationFrame(scrollAnimationFrame);
});

const onScroll = () => {
  if (scrollAnimationFrame) cancelAnimationFrame(scrollAnimationFrame);
  scrollAnimationFrame = requestAnimationFrame(handleScroll);
};

const handleScroll = () => {
  const scrollY = window.scrollY;
  const marginTop = Number(scrollMarginTop) || 0;
  const innerHeight = window.innerHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const isBottom = scrollHeight - (scrollY + innerHeight) < THRESHOLD;

  if (!headers.value.length || scrollY < 1) {
    setActiveHeader(null);
    return;
  }

  if (isBottom) {
    setActiveHeader(headers.value[headers.value.length - 1]);
    return;
  }

  let activeHeader = null;
  for (const header of headers.value) {
    if (header.top > scrollY + marginTop + THRESHOLD) {
      break;
    }
    activeHeader = header;
  }
  setActiveHeader(activeHeader);
};

function getHeaders() {
  const marginTop = Number(scrollMarginTop) || 0;
  const headersEl = Array.from(
    (parent ?? document).querySelectorAll('.blog-content :is(h2[id], h3[id])')
  );
  return headersEl
    .map((element) => ({
      element,
      id: element.getAttribute('id'),
      tagName: element.tagName,
      text: element.innerText,
      top: getAbsoluteTop(element) - marginTop,
    }))
    .filter(({ top }) => !Number.isNaN(top))
    .sort((a, b) => a.top - b.top);
}

function setActiveHeader(header) {
  const newHash = header?.id;

  if (activeHeader.value === newHash) {
    return;
  }
  activeHeader.value = newHash;

  if (newHash) {
    history.replaceState(null, '', `#${newHash}`);
  } else {
    history.replaceState(null, '', ' ');
  }
}

function getAbsoluteTop(element) {
  let top = 0;
  let el = element;
  while (el) {
    top += el.offsetTop || 0;
    el = el.offsetParent;
  }
  return top;
}
</script>

<template>
  <aside class="toc">
    <template v-for="link of headers" :key="link.id">
      <div
        :class="[
          'toc-item',
          {
            'is-sub-item': link.tagName === 'H3',
            'is-active': activeHeader === link.id,
          },
        ]"
      >
        <nuxt-link class="toc-item-text" :to="`#${link.id}`">
          {{ link.text }}
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
  left: 0px;
  padding: $p[6];
  max-width: calc(((100vw - 748px) / 2));

  +tablet() {
    display: none;
  }
}

.toc-item {
  transition: margin 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  display: block;
  width: 14px;
  height: 1.5px;
  background: var(--gray-color);
  margin: $m[5] 0;
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 0.1em;
  text-decoration-color: var(--gray-color);
  transform-origin: -2px 0;

  &.is-active {
    background: var(--accent-color);
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
  color: var(--gray-color);
  font-weight: normal;


  &:hover {
    color: var(--text-color);
  }
  
  .is-active & {
    color: var(--accent-color);
    font-weight: bold;

    +darkMode() {
      color: var(--accent-color);
    }
  }


  .is-sub-item & {
    margin-inline-start: $m[4];
    font-size: $text[1];
  }

  +darkMode() {
    color: var(--white-color);
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