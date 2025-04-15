<script setup>
const route = useRoute();
const blogParent = ref(null);
const path = route.path;
const { data: page } = await useAsyncData(path, () =>
  queryCollection('blog').path(path).first()
);
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
      <h1 class="blog-title">{{ page.title }}</h1>
      <TOC :parent="blogParent" />
      <div class="blog" ref="blogParent">
        <div class="blog-content">
          <ContentRenderer :value="page" />
        </div>
      </div>
    </article>
  </template>
</template>

<style>
.blog-article {
  margin: 0 auto;
  max-width: 100%;
}

.blog {
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
  word-break: break-word;
  width: 100%;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-color);
  background: var(--theme-bg-color);
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  padding: 2rem;


  & h2 {
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    line-height: 1.3;
  }

  & h3 {
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    font-weight: 600;
  }

  & p {
    margin-bottom: 1.5rem;
    max-width: 70ch;
  }

  & a {
    color: var(--accent-color);
    text-decoration: underline;
    text-decoration-thickness: 0.1em;
    text-underline-offset: 0.2em;
  }

  & img {
    max-width: 100%;
    margin: 2.5rem auto;
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
    background: var(--blockquote-bg);
    border-left: 10px solid var(--accent-color);
    margin: 2rem 0;
    padding: 1.5rem;
    border-radius: 4px;
    font-style: italic;

    & p {
      margin: 0;

      &+p {
        margin-top: 1rem;
      }
    }
  }

  & hr {
    margin: 4rem 0;
    border: 0;
    text-align: center;
    height: 1em;

    &::after {
      content: '...';
      font-size: 1.5rem;
      letter-spacing: 1em;
      padding-left: 1em;
      color: var(--text-color-light);
    }
  }

  @media (max-width: 768px) {

    & {
      font-size: 1rem;
      padding: 1.5rem;
    }

    & h2 {
      font-size: 1.5rem;
    }

    & h3 {
      font-size: 1.25rem;
    }
  }
}

.blog-title {
  margin: 0 0 3rem;
  font-size: 2.75rem;
  line-height: 1.2;
  font-weight: 800;
  max-width: 25ch;
  border-left: 0.2em solid var(--accent-color);
  padding-left: 0.75em;

  @media (max-width: 768px) {
    & {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }
}

.not-found-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 4rem 2rem;
}
</style>
