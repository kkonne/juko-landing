<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>

  <Footer />
</template>

<script lang="ts">
import Footer from "./components/Footer.vue"

export default {
  name: "App",
  components: {
    Footer,
  }
}
</script>

<style lang="scss">
@import url("./assets/tailwind.css");

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: $app_main_bg;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>