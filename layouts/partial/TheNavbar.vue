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
      <a class="navbar-brand" href="/">
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
@import '../../assets/stylus/config/_index.styl';

.navbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 50px 50px;
  font-size: $font-small;

  +mobile() {
    padding: 20px 10px;
  }
}

.navbar-end {
  margin-left: auto;

  +mobile() {
    flex-shrink: 0;
    margin: auto;
    width: 100%;
  }
}

.navbar-menu {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  +mobile() {
    justify-content: space-around;
    justify-content: space-evenly;
  }
}

.navbar-item {
  display: block;
  margin: 0;
  padding: 10px;
  color: $dark;
  font-weight: bold;
  transition: 130ms cubic-bezier(0.4, 0, 0.2, 1);
  text-underline-position: under;

  &:hover {
    text-decoration-color: $primary;
  }

  &:focus {
    outline: 2px dashed;
  }

  +dark() {
    color: $white;
  }

  +mobile() {
    padding: 10px 5px;
    font-size: 14px;
  }
}

.navbar-brand {
  text-decoration: none;

  +mobile() {
    display: block;
    margin: auto;
    margin-bottom: 20px;
  }
}

.navbar-toggle {
  padding: 10px 0;
  border: 0;
  background: none;
}

.brand-letter {
  color: $dark;
  font-weight: bold;
  font-size: $font-size[7];
  display: inline;

  +dark() {
    color: $white;
  }
}

.brand-dash {
  color: $primary;
  font-weight: bold;
  font-size: $font-size[7];
  animation: cursor 4s infinite;

  +dark() {
    color: $primary;
  }
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