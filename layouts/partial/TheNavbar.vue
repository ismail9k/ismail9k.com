<script setup>
const colorMode = useColorMode();
const links = [{ title: 'Blog', link: '/blog' }];
const modeSwitcherValue = ref(colorMode.value === 'dark');

const updateTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<template>
  <header>
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
              <label class="theme-switcher" for="themeSwitcher"
                ><span class="sr-only">Theme mode switcher</span
                ><input
                  ref="themeSwitcher"
                  v-model="modeSwitcherValue"
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
  align-items: center;
  justify-content: space-between;
  padding: $padding[4] ($padding[8]);

  +mobile() {
    padding: 20px 10px;
  }
}

.spacer {
  flex-grow: 1;
}

.navbar-end {
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
  color: $theme-text-color;

  +mobile() {
    padding: 10px 5px;
    font-size: 14px;
  }
}

.navbar-brand {
  text-decoration: none;
  flex: 1;

  +mobile() {
    display: block;
  }
}

.navbar-toggle {
  padding: 10px 0;
  border: 0;
  background: none;
}

.brand-letter {
  color: $theme-text-color;
  font-weight: bold;
  font-size: $font-size[7];
  display: inline;
}

.brand-dash {
  color: $accent;
  font-weight: bold;
  font-size: $font-size[7];
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