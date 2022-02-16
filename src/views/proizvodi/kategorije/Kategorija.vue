<template>
    <div id="odjeca">Ovoe kategorija {{ category }} haaa 👖</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
    name: 'Odjeca',

    data() {
        return {
            category: "majica"
        }
    },

    created () {
        const routeParam = this.$route.params.id;
        
        this.category = routeParam;
    },
});
</script>

<style lang="scss"></style>
