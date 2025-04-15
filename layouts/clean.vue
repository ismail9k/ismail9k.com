<template>
  <main>
    <VitePwaManifest />
    <div class="container">
      <slot></slot>
    </div>
  </main>
</template>

<script>
export default {
  name: 'LayoutClean',
};
</script>
