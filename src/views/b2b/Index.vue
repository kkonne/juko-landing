<template>
    <div id="b2b">
        <div class="b2b-main container">
            <h1>Welcome {{ userName }}</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import authStore from '@/store/auth';
export default {
    name: 'B2b',

    setup() {
        const { getUser } = authStore;
        let userName = ref(getUser.value.name);

        return {
            userName,
        };
    },
};
</script>

<style lang="scss">
.b2b-main {
    @apply my-10;
}
</style>
