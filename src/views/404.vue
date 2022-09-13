<template>
    <div id="404">
        <div class="error-wrap">
            <div class="error-content">
                <div class="error-heading"><code>404</code></div>
                <h3><code>&lt; An error occurred /&gt;</code></h3>
                <p class="my-10">
                    The thing you've been looking for is moved or deleted.
                </p>
                <span @click="routerService.routerLinkTo('/')" class="link">
                    &lt; Back to homepage
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import routerService from '@/services/router-service';

export default {
    name: '404',

    setup() {
        return {
            routerService,
        };
    },
};
</script>

<style lang="scss">
.error-wrap {
    @apply w-screen h-screen flex items-center justify-center text-center;

    .error-heading {
        font-size: 8rem;
        line-height: 10rem;
    }

    .link {
        @apply cursor-pointer border-b border-transparent hover:border-current;
    }
}
</style>
