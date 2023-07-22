<script setup>
</script>

<template>
  <ContentDoc>
    <template #default="{ doc }">
      <h1 class="blog-title">{{ doc.title }}</h1>
      <div class="blog">
        <ContentRenderer :value="doc"> </ContentRenderer>
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

.blog {
  width: 100%;
  color: $dark;

  img {
    max-width: 100%;
    margin: auto;
    display: block;
  }

  a {
    color: inherit;
  }

  +darkMode() {
    color: $white;
  }
}

.blog-title {
  margin-top: 0;
  margin-bottom: $margin[7];
  font-size: $font-size[7];

  +tablet() {
    font-size: $font-size[5];
  }
}

.not-fount-wrapper {
  display: flex;
  flex-direction: column;
  place-items: center;
  width: 100%;
}

pre {
  overflow: auto;
  padding: $padding[4] ($padding[6]);
  border-radius: 8px;
  background: $dark;

  +darkMode() {
    background: $light;
    box-shadow: inset 0 0 5px alpha($dark, 50%);
  }
}

blockquote {
  background: $gray;
  border-left: 10px solid $dark;
  margin: $margin[3] ($margin[0]);
  padding: $padding[4] ($padding[4]);
  quotes: '\201C' '\201D' '\2018' '\2019';

  &:before {
    color: $dark;
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
    border-color: $light;

    &:before {
      color: $black;
    }
  }
}
</style>