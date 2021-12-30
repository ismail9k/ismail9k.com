<template lang="pug">
.sub-experience
  a.sub-experience-title(:href='exp.url', target='_blank', rel='noopener')
    h5
      span {{ exp.name }}

  .sub-section-content
    .sub-experience-content(v-html='exp.content')
    template(v-if='exp.knowledge')
      h5 Leveraged knowledge:
      p {{ exp.knowledge }}
</template>

<script>
export default {
  name: 'SubExperience',
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    exp() {
      const res = this.$static.allSubExperience.edges.filter(
        ({ node }) => node.name.toLowerCase() === this.name
      );
      return res?.[0].node || {};
    },
  },
};
</script>

<static-query>
query {
  allSubExperience(limit: 5) {
    edges {
      node {
        name
        url
        knowledge
        content
      }
    }
  }
}
</static-query>


<style lang="stylus" >
@import '../assets/style/utils/_index.styl'

.sub-experience-content
  margin: 0

.sub-experience
  position: relative
  margin: 5px 0
  padding-inline-start: 10px
  margin-inline-start: 10px
  &:after
    position: absolute
    top: 8px
    left: -16px
    display: block
    width: 8px
    height: 8px
    border-radius: 8px
    background-color: lighten($dark, 20%)
    content: ''

.sub-section-content
  margin-inline-start: 20px

.sub-experience-title
  display: block
  margin-top: 0
  margin-bottom: 0.5em
  color: $dark
  text-decoration: none
  font-weight: bold
  font-size: 20px

  small
    font-size: 12px
    color: lighten($dark, 20%)
    margin: 0 20px

.sub-experience-date,
.sub-experience-subtitle
  display: block
  color: lighten($dark, 20%)
  font-size: 12px

.sub-experience-subtitle
  float: right
  +mobile()
    float: none
</style>