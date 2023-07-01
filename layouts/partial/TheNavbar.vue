<script setup>
const themeSwitcher = ref(null);
const links = [{ title: 'Blog', link: '/blog' }];
const isDark = ref(false);
const initThemeSwitcher = () => {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  isDark.value = mql.matches;
  mql.addListener((e) => updateTheme(e.matches));
};

const updateTheme = () => {
  const body = document.querySelector('body');
  const newTheme = isDark.value ? 'dark' : 'light';

  body.classList.remove('theme-dark', 'theme-light');
  body.classList.add(`theme-${newTheme}`);
};

onMounted(() => {
  initThemeSwitcher();
  updateTheme();
});
</script>

<template>
  <header>
    <nav class="navbar">
      <a class="navbar-brand" href="https://ismail9k.com">
        <h1 class="brand-letter">Ismail9k</h1>
        <span class="brand-dash">_</span>
      </a>
      <div class="navbar-end">
        <ul class="navbar-menu">
          <li v-for="item in links" :key="item.title">
            <a class="navbar-item" :href="item.link">{{ item.title }}</a>
          </li>
          <li>
            <div class="navbar-item">
              <label class="theme-switcher" for="themeSwitcher"
                ><span class="sr-only">Theme mode switcher</span
                ><input
                  ref="themeSwitcher"
                  v-model="isDark"
                  id="themeSwitcher"
                  type="checkbox"
                  aria-labelledby=""
                  @change="updateTheme"
                /><span class="theme-🌝">🌝</span
                ><span class="theme-🌚">🌚</span></label
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>


<style lang="stylus">
.theme-switcher {
  display: flex;
  margin: 0 10px;
  font-size: 20px;
  cursor: pointer;

  input {
    display: none;

    &:checked {
      ~ .theme-\🌝 {
        display: block;
      }

      ~ .theme-\🌚 {
        display: none;
      }
    }
  }
}

.theme-\🌝 {
  display: none;
}

.theme-\🌚 {
  display: block;
}
</style>