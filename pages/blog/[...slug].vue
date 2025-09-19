<script setup>
const route = useRoute();
const blogParent = ref(null);
const path = route.path;
const { data: page } = await useAsyncData(path, () =>
  queryCollection('blog').path(path).first()
);

// Extract slug from the route path
const slug = route.params.slug?.[0] || route.path.split('/').pop();

// If page has an image property, use it as the og image URL
// Otherwise use the custom BlogPost component
if (page.value?.header) {
  defineOgImage({
    url: `/img/${slug}/${page.value.header}`
  })
} else {
  defineOgImageComponent('OGImage', {
    title: page.value?.title,
    description: page.value?.description,
    slug: slug || '',
  });
}
</script>

<template>
  <template v-if="!page">
    <div class="not-found-wrapper">
      <p>Blog not found</p>
      <Btn href="/"> Back home </Btn>
    </div>
  </template>

  <template v-else>
    <article class="blog-article">
      <div class="blog-header">
        <h1 class="blog-title">{{ page.title }}</h1>
        <p v-if="page.date" class="blog-date">
          {{ new Date(page.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
      <TOC :parent="blogParent" scroll-margin-top="90" />
      <div ref="blogParent" class="blog">
        <div class="blog-content">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </article>
  </template>
</template>

<style>
.blog-article {
  --blog-padding: 2rem;
  --bar-width: 0.3rem;
  margin: 0 auto;
  width: calc(680px + 2 * var(--blog-padding));
  max-width: 100%;

  @media (max-width: 768px) {
    & {
      --blog-padding: 1rem;
    }
  }
}

.blog {
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
  word-break: break-word;
  width: 100%;
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-color);
  background: var(--theme-bg-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  padding: var(--blog-padding);
  font-family: 'Source Serif Pro', Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: normal;
  font-weight: 400;


  & h2 {
    scroll-margin-top: 90px;
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  }

  & h3 {
    scroll-margin-top: 90px;
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    font-weight: 600;
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  }

  & p {
    margin: 2rem 0;
  }


  & a {
    color: var(--text-color);
    text-decoration: underline;
    text-decoration-thickness: 0.05em;
    text-underline-offset: 0.1em;
    text-decoration-color: var(--accent-color);
    transition: var(--transition);
    &:hover {
      color: var(--accent-color);
    }
  }

  & :is(h1, h2, h3, h3) > a {
    text-decoration: none;
  }

  & img {
    max-width: 100%;
    min-width: 250px;
    margin: 1rem auto;
    display: block;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  & pre {
    overflow-x: auto;
    padding: 1.25rem 1.5rem;
    border-radius: 8px;
    background: var(--code-bg);
    border: 1px solid var(--border-color);
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 2rem 0;

    & code {
      padding: 0;
      background: none;
    }
  }

  & code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.9em;
    padding: 0.2em 0.4em;
    border-radius: 4px;
    background: var(--code-bg);
  }

  & blockquote {
    border-left: var(--bar-width) solid var(--accent-color);
    margin: 2rem 0;
    padding-left: var(--blog-padding);
    margin-left: calc(-1 * var(--blog-padding));
    font-style: italic;
    line-height: 2;

    & p {
      margin: 0;

      &+p {
        margin-top: 1rem;
      }
    }
  }

  & hr {
    margin: 3rem 0;
    border: 0;
    text-align: center;
    height: 1em;
    &::before {
      content: '...';
      font-size: 2rem;
      line-height: 0;
      letter-spacing: 0.2em;
      font-weight: 700;
      color: var(--text-color-light);
    }
  }

  @media (max-width: 768px) {

    & {
      font-size: 1rem;
    }

    & h2 {
      font-size: 1.5rem;
    }

    & h3 {
      font-size: 1.25rem;
    }
  }
}

.blog-content > div {
  & > * {
    margin-top: 0;
  }
}

.blog-header {

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  border-left: var(--bar-width) solid var(--accent-color);
  padding: calc(var(--blog-padding) / 2) var(--blog-padding);
  margin: 0 0 3rem;
}

.blog-title {
  scroll-margin-top: 90px;
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 800;
  max-width: 25ch;
  margin: 0;

  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

  @media (max-width: 768px) {
    & {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
}

.blog-date {
  margin: 0;
  color: var(--text-color-light);
  font-size: 1.1rem;
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
}

.not-found-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 4rem 2rem;
}
</style>
