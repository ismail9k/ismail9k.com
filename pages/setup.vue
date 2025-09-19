<script setup>
import setupData from '~/data/setup.json';

const title = 'Setup - Ismail9k';
const description = 'My current development setup, tools, and gear that help me build software. From editors to hardware, here\'s what I\'m using and why.';

const { trackUsesClick } = useTracking();


const handleLinkClick = (itemName, url, category) => {
  trackUsesClick(itemName, url, category);
};


const getShortDescription = (description, span = 1) => {
  const length = span * 150;
  return description.length > length ? description.substring(0, length) + '...' : description;
};


useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: description,
    },
  ],
});
</script>

<template>
  <section class="section">
    <h1 class="main-title">Setup</h1>
    <div class="main-description">
      <p>
        I get quite a few messages asking about my setup, tools, and the specifics of my development environment.
        Rather than answering the same questions repeatedly, I figured I'd create this living document to share what I'm
        currently using and why I chose each piece.
      </p>
    </div>
  </section>

  <section v-for="section in setupData.sections" :key="section.id" class="section">
    <h2 class="title">{{ section.title }}</h2>
    <div class="items-grid">
      <div
v-for="item in section.items" :key="item.name" class="item-card"
        :style="`grid-column: span ${item.span || 1};`">
        <span v-if="item.label" class="item-label">{{ item.label }}</span>

        <div class="item-image">
          <img v-if="item.image" :src="item.image" :alt="item.name" >
          <div v-else class="item-placeholder">
            <span class="item-initial">{{ item.name.charAt(0) }}</span>
          </div>
        </div>
        <div class="item-content">
          <h3 class="item-name">
            <a
:href="item.url" target="_blank" rel="noopener" class="item-link" :data-name="item.name"
              :data-url="item.url" :data-category="item.category"
              @click="handleLinkClick(item.name, item.url, item.category)">
              {{ item.name }}
            </a>
          </h3>
          <p class="item-description">{{ getShortDescription(item.description, item.span) }}</p>
        </div>
      </div>
    </div>

    <!-- Render additional content if it exists -->
    <div v-if="section.additionalContent" class="additional-content">
      <div v-for="(content, index) in section.additionalContent" :key="index" class="content">
        <p v-if="content.type === 'paragraph'" v-html="content.content"/>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="content">
      <p class="update-note">
        <small><em>Last updated: September 2025</em></small>
      </p>
    </div>
  </section>
</template>

<style>
.content {
  max-width: none;
}

.content p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.content strong {
  font-weight: 600;
}


.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.item-card {
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
}

.item-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.08) 100%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.item-card:hover::before {
  opacity: 1;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--color-primary);
}

.item-image {
  width: 60px;
  height: 60px;
  margin-bottom: var(--spacing-5);
  position: relative;
  z-index: 1;
  border-radius: 8px;
  padding: 2px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.item-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-initial {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.item-content {
  position: relative;
  z-index: 1;
}

.item-name {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.item-link:hover {
  color: var(--accent-color);
  text-decoration: underline;
}

.item-label {
  background: var(--color-primary);
  color: var(--text-color);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  white-space: nowrap;
  opacity: 0.9;
  position: absolute;
  top: 0;
  right: 0;
}

.item-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

a.uses-link {
  color: var(--color-primary);
  text-decoration: underline;
  text-decoration-color: var(--accent-color);
  text-underline-offset: 0.2em;
  transition: opacity 0.2s ease;
}

.update-note {
  text-align: center;
  opacity: 0.7;
  margin-top: 3rem;
}

.additional-content {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.additional-content .content {
  max-width: none;
}

.additional-content .content p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
  color: var(--text-primary);
}

.additional-content .content strong {
  font-weight: 600;
  color: var(--color-primary);
}

.section+.section {
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .header-controls {
    flex-direction: column;
    gap: 1rem;
  }

  .view-toggle {
    align-self: flex-start;
  }

  .items-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .item-card {
    padding: 1.25rem;
    grid-column: span 1 !important;
  }

  .item-name {
    flex-wrap: wrap;
    gap: 0.25rem;
  }


  .content p {
    margin-bottom: 1.25rem;
  }

  .section+.section {
    margin-top: 2rem;
  }
}

@media (max-width: 480px) {
  .items-grid {
    grid-template-columns: 1fr;
  }

  .item-card {
    padding: 1rem;
  }
}
</style>