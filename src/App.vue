<template>
    <div id="app-main">
        <Navbar v-if="!$route.meta.hideNavigation" />

        <div class="app-main">
            <router-view />
        </div>

        <Footer v-if="!$route.meta.hideNavigation" />
    </div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Footer,
        Navbar,
    },
};
</script>

<style lang="scss">
@import url('./assets/tailwind.css');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600&family=Montserrat:wght@200;400;600&display=swap');

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background-color: $app_main_bg;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $text-main;

    @apply dark:bg-gray-900 dark:text-gray-100;

    .app-main {
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);
    }
}
</style>
