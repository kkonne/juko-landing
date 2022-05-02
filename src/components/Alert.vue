<template>
    <div
        class="alert"
        :class="type === 'error' ? 'alert-error' : 'alert-success'"
    >
        <div class="alert-icon">
            <inline-svg
                :src="
                    require(type === 'error'
                        ? '@/assets/images/error-icon.svg'
                        : '@/assets/images/success-icon.svg')
                "
                class="icon"
            ></inline-svg>
        </div>

        <div class="alert-text">
            {{ message }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Alert',

    props: {
        type: String,
        message: String,
    },
};
</script>

<style lang="scss">
.alert {
    @apply w-full shadow-xl p-4 my-4 border-l-8 rounded-lg flex flex-col
        md:flex-row md:items-center;

    &.alert-success {
        @apply bg-gray-100 text-gray-900 border-green-500
            dark:bg-gray-800 dark:text-gray-200 dark:border-green-400;
    }

    &.alert-error {
        @apply bg-gray-100 text-gray-900 border-red-500
            dark:bg-gray-800 dark:text-gray-200 dark:border-red-500;
    }

    .alert-icon {
        @apply h-8 w-8 mr-2 flex justify-center items-center;

        .icon svg {
            @apply w-full h-full p-1;
        }
    }

    .alert-text {
        @apply my-2 md:my-0;

        b {
            @apply text-black dark:text-white;
        }
    }
}
</style>
