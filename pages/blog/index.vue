<script setup>
const title = 'Blog - Ismail9k';
const description = 'Technical articles, tutorials, and insights about web development, CSS, JavaScript, Vue.js, and modern software engineering practices.';

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

const route = useRoute();
const router = useRouter();

// Pagination settings
const postsPerPage = 10;
const currentPage = ref(Number(route.query.page) || 1);

// Filter settings
const selectedTag = ref(route.query.tag || '');

// Fetch all posts
const { data: allPosts } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .select('date', 'title', 'subtitle', 'description', 'path', 'tags')
    .all()
);

// Extract unique tags
const availableTags = computed(() => {
  if (!allPosts.value) return [];
  const tagsSet = new Set();
  allPosts.value.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  return Array.from(tagsSet).sort();
});

// Filter posts by tag
const filteredPosts = computed(() => {
  if (!allPosts.value) return [];
  if (!selectedTag.value) return allPosts.value;
  return allPosts.value.filter(post =>
    post.tags && post.tags.includes(selectedTag.value)
  );
});

// Calculate pagination
const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage)
);

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

// Handle tag filter
const selectTag = (tag) => {
  selectedTag.value = tag;
  currentPage.value = 1;
  updateURL();
};

const clearTag = () => {
  selectedTag.value = '';
  currentPage.value = 1;
  updateURL();
};

// Handle pagination
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  updateURL();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Update URL with query parameters
const updateURL = () => {
  const query = {};
  if (currentPage.value > 1) query.page = currentPage.value;
  if (selectedTag.value) query.tag = selectedTag.value;
  router.push({ query });
};

// Watch route changes
watch(() => route.query, (newQuery) => {
  currentPage.value = Number(newQuery.page) || 1;
  selectedTag.value = newQuery.tag || '';
});
</script>

<template>
  <section class="section">
    <h2 class="main-title">Blog</h2>
    <div class="main-description">
      Welcome to my blog - a blend of my life's work, experiences, challenges,
      and thoughts, captured as they come. Join me on this introspective
      journey.
    </div>
  </section>

  <!-- Tags Filter -->
  <section v-if="availableTags.length > 0" class="section tags-section">
    <div class="tags-filter">
      <button
        class="tag-button"
        :class="{ active: !selectedTag }"
        @click="clearTag"
      >
        All Posts
      </button>
      <button
        v-for="tag in availableTags"
        :key="tag"
        class="tag-button"
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
  </section>

  <!-- Blog Posts -->
  <section class="section">
    <BlogCard v-for="blog in paginatedPosts" :key="blog.path" v-bind="blog" />

    <div v-if="paginatedPosts.length === 0" class="no-posts">
      No posts found for the selected tag.
    </div>
  </section>

  <!-- Pagination -->
  <section v-if="totalPages > 1" class="section pagination-section">
    <div class="pagination">
      <button
        class="pagination-button"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>

      <div class="pagination-numbers">
        <button
          v-for="page in totalPages"
          :key="page"
          class="pagination-number"
          :class="{ active: currentPage === page }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="pagination-button"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
.tags-section {
  padding-top: 0;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-10);
}

.tag-button {
  padding: var(--spacing-5) var(--spacing-8);
  border: 1px solid var(--dark-color-alpha-20);
  background: transparent;
  color: var(--theme-text-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
}

.tag-button:hover {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-color: var(--accent-color);
}

.tag-button.active {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.dark .tag-button {
  border-color: var(--white-color-alpha-20);
}

.no-posts {
  text-align: center;
  padding: var(--spacing-15);
  color: var(--dark-gray-color);
}

.pagination-section {
  padding-bottom: var(--spacing-20);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-5);
  margin-top: var(--spacing-15);
}

.pagination-button {
  padding: var(--spacing-5) var(--spacing-10);
  border: 1px solid var(--dark-color-alpha-20);
  background: transparent;
  color: var(--theme-text-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
}

.pagination-button:hover:not(:disabled) {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-color: var(--accent-color);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: var(--spacing-3);
}

.pagination-number {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--dark-color-alpha-20);
  background: transparent;
  color: var(--theme-text-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
}

.pagination-number:hover {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border-color: var(--accent-color);
}

.pagination-number.active {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.dark .pagination-button,
.dark .pagination-number {
  border-color: var(--white-color-alpha-20);
}

@media screen and (max-width: 768px) {
  .pagination {
    flex-direction: column;
  }

  .pagination-numbers {
    order: -1;
  }
}
</style>
