<script setup>
const colorMode = useColorMode();
const links = [
  { title: 'Blog', link: '/blog' },
  { title: 'Side-Quests', link: '/side-quests' },
  // { title: 'QR Scanner', link: '/tools/qr-scanner' },
];
const modeSwitcherValue = ref(colorMode.value === 'dark');
const isScrolled = ref(false);

const updateTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0;
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0;
  });
});
</script>

<template>
  <header :class="{ 'is-scrolled': isScrolled }">
    <nav class="navbar">
      <NuxtLink class="navbar-brand" to="/">
        <h1 class="brand-letter">Ismail9k</h1>
        <span class="brand-dash">_</span>
      </NuxtLink>

      <div class="spacer"></div>
      <div class="navbar-end">
        <ul class="navbar-menu">
          <li v-for="item in links" :key="item.title">
            <NuxtLink class="navbar-item" :to="item.link">{{
              item.title
            }}</NuxtLink>
          </li>
          <li>
            <div class="navbar-item">
              <label class="theme-switcher" for="themeSwitcher"><span class="sr-only">Theme mode switcher</span><input
                  ref="themeSwitcher" v-model="modeSwitcherValue" id="themeSwitcher" type="checkbox" aria-labelledby=""
                  @change="updateTheme" /><span class="theme-🌝">🌝</span><span class="theme-🌚">🌚</span></label>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>


<style>
header {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

header.is-scrolled {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.spacer {
  flex-grow: 1;
}

.navbar-menu {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar-item {
  display: block;
  margin: 0;
  padding: 10px;
  color: var(--theme-text-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-brand {
  text-decoration: none;
  padding: 0.5rem;
}

.navbar-toggle {
  padding: 10px 0;
  border: 0;
  background: none;
}

.brand-letter {
  color: var(--theme-text-color);
  font-weight: bold;
  font-size: 1.5rem;
  display: inline;
}

.brand-dash {
  color: var(--accent-color);
  font-weight: bold;
  font-size: 1.5rem;
  animation: cursor 4s infinite;
}

@keyframes cursor {
  90% {
    opacity: 1;
  }

  95% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.theme-switcher {
  display: flex;
  margin: 0 10px;
  font-size: 20px;
  cursor: pointer;
}

.theme-switcher input {
  display: none;
}

.theme-switcher input:checked~.theme-🌝 {
  display: block;
}

.theme-switcher input:checked~.theme-🌚 {
  display: none;
}

.theme-🌝 {
  display: none;
}

.theme-🌚 {
  display: block;
}
</style>