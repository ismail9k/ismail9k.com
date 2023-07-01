<template>
  <header>
    <nav class="navbar">
      <a class="navbar-brand" href="https://ismail9k.com">
        <h1 class="brand-letter">Ismail9k</h1>
        <span class="brand-dash">_</span>
      </a>
      <div class="navbar-end">
        <ul class="navbar-menu">
          <li><a class="navbar-item" href="#working">working</a></li>
          <li><a class="navbar-item" href="#projects">projects</a></li>
          <li><a class="navbar-item" href="#writings">writings</a></li>
          <li><a class="navbar-item" href="#contact">contact</a></li>
          <li>
            <div class="navbar-item">
              <label class="theme-switcher" for="themeSwitcher"
                ><span class="sr-only">Theme mode switcher</span
                ><input
                  id="themeSwitcher"
                  type="checkbox"
                  aria-labelledby=""
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

<script>
export default {
  name: 'TheNavbar',
  mounted() {
    this.initThemeSwitcher();
  },
  methods: {
    initThemeSwitcher() {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const themeSwitcher = document.querySelector('#themeSwitcher');

      themeSwitcher.checked = mql.matches;
      themeSwitcher.addEventListener('change', this.themeChangeHandler);
      mql.addListener(this.themeChangeHandler);
    },

    themeChangeHandler(e) {
      const body = document.querySelector('body');
      const themeSwitcher = document.querySelector('#themeSwitcher');
      const isDark = (e.target && e.target.checked) || e.matches;

      themeSwitcher.checked = isDark;
      body.classList.remove('theme-dark', 'theme-light');
      body.classList.add(`theme-${isDark ? 'dark' : 'light'}`);
    },
  },
};
</script>

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