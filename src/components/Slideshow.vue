<template>
    <div class="slideshow">
        <div class="left-shadow slideshow-shadow"></div>
        <div class="right-shadow slideshow-shadow"></div>

        <div class="assets">
            <img
                src="https://soling.md/images/stories/virtuemart/manufacturer/resized/cerva.png"
                alt="Logo 1"
            />
            <img
                src="https://www.promocadeaux.com/wp-content/uploads/2020/01/kariban.png"
                alt="Logo 2"
            />
            <img
                src="https://www.europeancatalog.eu/media/aitmanufacturers/threehundred/gildan.png"
                alt="Logo 3"
            />
            <img
                src="https://www.bbfsafety.co.za/wp-content/uploads/2020/02/lemaitre-logo-white.png"
                alt="Logo 4"
            />
            <img
                src="https://img2.storyblok.com/360x158/filters:quality(100)/f/68186/374x164/7a363b0390/kl-stack-logo-white.png"
                alt="Logo 5"
            />
            <img
                src="https://sportland.com/media/wysiwyg/brandsHistoryBlockLogo/helly-hansen.png"
                alt="Logo 6"
            />
            <img
                src="https://b2bit.ba/wp-content/uploads/2019/10/miviko-logo.png"
                alt="Logo 6"
            />
        </div>
        <div class="assets">
            <img
                src="https://soling.md/images/stories/virtuemart/manufacturer/resized/cerva.png"
                alt="Logo 1"
            />
            <img
                src="https://www.promocadeaux.com/wp-content/uploads/2020/01/kariban.png"
                alt="Logo 2"
            />
            <img
                src="https://www.europeancatalog.eu/media/aitmanufacturers/threehundred/gildan.png"
                alt="Logo 3"
            />
            <img
                src="https://www.bbfsafety.co.za/wp-content/uploads/2020/02/lemaitre-logo-white.png"
                alt="Logo 4"
            />
            <img
                src="https://img2.storyblok.com/360x158/filters:quality(100)/f/68186/374x164/7a363b0390/kl-stack-logo-white.png"
                alt="Logo 5"
            />
            <img
                src="https://sportland.com/media/wysiwyg/brandsHistoryBlockLogo/helly-hansen.png"
                alt="Logo 6"
            />
            <img
                src="https://b2bit.ba/wp-content/uploads/2019/10/miviko-logo.png"
                alt="Logo 6"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Slideshow',
};
</script>

<style lang="scss">
.slideshow {
    @apply relative w-full overflow-x-hidden h-40 flex items-center justify-start my-8;

    .slideshow-shadow {
        @apply absolute z-10 top-0 w-12 h-full;
    }

    .left-shadow {
        @apply left-0 bg-gradient-to-r from-gray-200
            dark:from-gray-900;
    }

    .right-shadow {
        @apply right-0 bg-gradient-to-l from-gray-200
            dark:from-gray-900;
    }

    .assets {
        @apply flex items-center justify-start min-w-max;
        animation: slide 40s linear infinite;

        img {
            @apply h-12 mx-4 md:mx-8 2xl:mx-16;
            filter: brightness(10) grayscale(1);
        }
    }


    @keyframes slide {
        100% {
            transform: translateX(-100%);
        }
    }
}
</style>
