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

  +dark() {
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
</style>