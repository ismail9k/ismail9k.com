<template lang="pug">
include ../fx-mixin.pug

Layout
  section.intro
    .intro-info
      h2.intro-title.animation(data-animation='slide-up')
        | I'm Abdelrahman Ismail, a full-stack engineer, writer, and pro gamer.
    .intro-figure.animation(data-animation='bounce')
      Figure

  section#working.section
    .section-info.animation(data-animation='slide-up'): .section-sticky
      h2.section-title.fx
        +fx('Wor-', 'king')
    .section-elements
      .card.animation(data-animation='slide-up')
        h3.card-title Summary
        p.card-description
          | {{ summary.summary }}
        h3.card-title Skills
        p.card-description
          | {{ skills.expert.join(', ') }}
        a.resume-button.link(href='/resume', target='_blank', rel='noopener').
          Complete Résumé

  section#projects.section
    .section-info.animation(data-animation='slide-up'): .section-sticky
      h2.section-title.fx
        +fx('Pro-', 'jects')

      p.section-description.
        I'm pleasing being part of these awesome projects, which aim to give a better experience for both developer and end-user.
    .section-elements
      .card.animation(data-animation='slide-up', v-for='project in projects')
        h3.card-title
          a.link(:href='project.link', target='_blank', rel='noopener') {{ project.title }}
        h4.card-subtitle {{ project.type }}
        p.card-description {{ project.description }}

  section#writings.section
    .section-info.animation(data-animation='slide-up'): .section-sticky
      h2.section-title.fx
        +fx('Wri-', 'tings')
      p.section-description.
        Top 7 author badge#[br]
        500+ followers with 35k+ total views, and four badges.#[br]
        I write generally about front-end development techniques and tips.
    .section-elements
      .card.animation(data-animation='slide-up', v-for='post in posts')
        h3.card-title
          a.link(:href='post.link', target='_blank', rel='noopener') {{ post.title }}
        p.card-description {{ post.excerpt }}
        a.card-button(:href='post.link', target='_blank', rel='noopener') read more

  section#contact.section.is-center
    .section-info.animation(data-animation='slide-up'): .section-sticky
      h2.section-title.fx
        +fx('Con-', 'tact')
      p.section-description.
        It's your turn now, get in touch. Tell me about your self and how I can help you.
    .section-elements.animation(data-animation='slide-up')
      a.contact-button.link(
        href='https://twitter.com/ismail_9k',
        target='_blank',
        rel='noopener'
      ).
        Feel free to send me a massage on twitter!
</template>



<static-query>
query {
  allBlogPost(limit:5) {
    edges {
      node {
        title
        excerpt
        link
      }
    }
  }

  allProject(limit:5) {
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

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
