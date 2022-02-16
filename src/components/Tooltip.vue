<template>
    <div class="card-tooltip">
        <div class="tooltip-icon">
            <img
                src="http://simpleicon.com/wp-content/uploads/light-bulb-3.png"
                class="icon"
            />
        </div>

        <div class="tooltip-title">{{ title }}</div>

        <div class="tooltip-text">
            {{ text }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Tooltip',

    props: {
        title: String,
        text: String,
    },
};
</script>

<style lang="scss">
.card-tooltip {
    @apply w-full max-w-lg bg-gray-400 text-gray-900 p-6 my-4 border-l-8
        border-blue-600 rounded-md
        dark:bg-gray-600 dark:text-gray-100 dark:border-blue-300;

    .tooltip-icon {
        @apply absolute bg-blue-600 w-8 h-8 -ml-11 border-4 border-gray-200
            rounded-full flex justify-center items-center text-gray-200
            dark:bg-blue-300 dark:border-gray-900;

        .icon {
            @apply w-full h-full p-1;
        }
    }

    .tooltip-title {
        @apply uppercase my-1 font-bold tracking-wide;
    }

    .tooltip-text {
        @apply my-1 text-sm;

        b {
            @apply text-black dark:text-white;
        }
    }
}
</style>
