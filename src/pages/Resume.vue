<template lang="pug">
CleanLayout
  .resume
    .resume-header
      h2.resume-name {{ info.name }}
      a.resume-header-info(:href='info.portfolio', target='_blank')
        AppIcon(name='home')
        | {{ info.portfolio }}
      a.resume-header-info(:href='info.github', target='_blank')
        AppIcon(name='github')
        | {{ info.github }}
      a.resume-header-info(
        :href='`mailto:${info.email}?Subject=Hello`',
        target='_blank'
      )
        AppIcon(name='mail')
        | {{ info.email }}
      a.resume-header-info(:href='`tel:${info.portfolio}`', target='_blank')
        AppIcon(name='phone')
        | {{ info.mobile }}
      a.resume-header-info
        AppIcon(name='landMark')
        | {{ info.address }}

    .resume-section
      h3.resume-title Summary
      .resume-section-content
        p {{ summary.summary }}
    .resume-section
      h3.resume-title Experiences

      .resume-experience(v-for='exp in experiences')
        a.resume-experience-title(
          :href='exp.url',
          target='_blank',
          rel='noopener'
        )
          h4 {{ exp.title }}
          |
          | -
          |
          small {{ exp.name }}
          span.resume-experience-subtitle {{ exp.location }}
          span.resume-experience-date {{ exp.start }} - {{ exp.end }}

        .resume-section-content
          .resume-experience-content(v-html='exp.content')
          template(v-if='exp.knowledge')
            h5 Leveraged knowledge:
            p {{ exp.knowledge }}
            p {{ exp.sub }}

          .resume-sub-experience(v-if='exp.sub')
            template(v-for='sub in exp.sub.split(",")')
              SubExperience(:name='sub')

    .resume-section(style='page-break-inside: avoid')
      h3.resume-title Personal Projects
      .resume-section-content
        .resume-project(v-for='project in projects')
          a.resume-project-title(:href='project.link', target='_blank')
            h4 {{ project.title }}
            span
              |
              | -
              |
            span.resume-project-type {{ project.type }}
          p.resume-project-description {{ project.description }}
    .resume-section
      h3.resume-title Education
      .resume-section-content
        dl.resume-education
          dt.resume-education-data(style='grid-column: span 2') {{ education.university }}
          dt.resume-education-term Major:
          dd.resume-education-data {{ education.major }}
          dt.resume-education-term Minor:
          dd.resume-education-data {{ education.minor }}
          dt.resume-education-term CS Coursework:
          dd.resume-education-data {{ education.coursework_ee }}
          dt.resume-education-term EE Coursework:
          dd.resume-education-data {{ education.coursework_cs }}

    .resume-section
      h3.resume-title Skills
      .resume-section-content
        p {{ skills.expert.join(", ") }}
        p {{ skills.moderate.join(", ") }}
        p {{ skills.other.join(", ") }}
</template>

<script>
import education from '~/assets/data/resources/education.json';
import summary from '~/assets/data/resources/summary.json';
import skills from '~/assets/data/resources/skills.json';
import info from '~/assets/data/resources/info.json';
import AppIcon from '~/components/AppIcon';
import SubExperience from '~/components/SubExperience';

export default {
  name: 'Resume',
  components: { AppIcon, SubExperience },
  data: () => ({
    education,
    summary,
    skills,
    info,
  }),
  computed: {
    experiences() {
      return this.$static.allExperience.edges.map(({ node }) => node) || [];
    },
    projects() {
      return this.$static.allProject.edges.map(({ node }) => node) || [];
    },
  },
  metaInfo: {
    title: 'Resume',
  },
};
</script>

<static-query>
query {
  allExperience(limit: 100 sortBy: "sort" order: DESC) {
    edges {
      node {
        name
        url
        title
        location
        start
        end
        knowledge
        content
        sub
      }
    }
  }

  allProject(limit: 4 sortBy: "sort" order: ASC) {
    edges {
      node {
        title
        type
        description
        link
      }
    }
  }
}
</static-query>

<style lang="stylus">
@import '../assets/style/utils/_index.styl'
@import '../assets/style/resume'
</style>
