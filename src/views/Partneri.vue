<template>
    <div id="partneri" class="partneri-main container">
        <h1 class="headline">Partners</h1>

        <p class="subtitle">Reputable brands that deliver top quality workwear products we're proud to work with</p>

        <Slideshow />
    </div>
</template>

<script lang="ts">
import Slideshow from '@/components/Slideshow.vue';

export default {
    name: 'Partneri',

    components: {
        Slideshow,
    },
};
</script>

<style lang="scss">
.partneri-main {
    @apply my-10;
}
</style>
