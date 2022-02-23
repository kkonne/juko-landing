<template>
    <div class="alert"
        :class="type === 'error' ? 'alert-error' : 'alert-success'">
        <div class="alert-icon">
            <img
                :src="
                    type === 'error'
                        ? 'https://images.fineartamerica.com/images/artworkimages/medium/2/cross-in-circle-in-red-tom-hill-transparent.png'
                        : 'https://diamedicalusa.com/wp-content/uploads/2021/08/Icon-ionic-ios-checkmark-circle-outline.png'
                "
                class="icon"
            />
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
        md:flex-row;
        
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

        .icon {
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
