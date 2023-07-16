<script>
</script>


<template>
  <ContentDoc>
    <template #default="{ doc }">
      <h1 class="blog-title">{{ doc.title }}</h1>

      <div class="blog">
        <TOC :links="doc.body?.toc?.links" />

        <div class="blog-content">
          <ContentRenderer :value="doc"> </ContentRenderer>
        </div>
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

.blog-content {
  width: 100%;
}

.blog {
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
  word-break: break-word;
  width: 100%;
  max-width: 748px;
  font-size: $text[4];
  line-height: 1.6em;

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
  margin-bottom: $m[20];
  font-size: $text[10];
  line-height: 1.5;
  max-width: 20ch;
  border-left: 0.2em solid $accent;
  padding-left: 0.5em;

  +tablet() {
    margin-bottom: $m[15];
    font-size: $text[8];
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
  background: $dark;
  border: 1px solid $dark;
  font-size: $text[3];

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
