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
                src="https://68.cdn.ekm.net/ekmps/shops/tuffworkwear/images/kariban-padded-parka-jacket-kb677-[5]-72977-p.png?v=1"
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
                src="https://bworkwear.ie/wp-content/uploads/2019/11/fbc4377b8d3770200c1bd281215c5a4f.png"
                alt="Logo 5"
            />
            <img
                src="https://sportland.com/media/wysiwyg/brandsHistoryBlockLogo/helly-hansen.png"
                alt="Logo 6"
            />
        </div>
        <div class="assets">
            <img
                src="https://soling.md/images/stories/virtuemart/manufacturer/resized/cerva.png"
                alt="Logo 1"
            />
            <img
                src="https://68.cdn.ekm.net/ekmps/shops/tuffworkwear/images/kariban-padded-parka-jacket-kb677-[5]-72977-p.png?v=1"
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
                src="https://bworkwear.ie/wp-content/uploads/2019/11/fbc4377b8d3770200c1bd281215c5a4f.png"
                alt="Logo 5"
            />
            <img
                src="https://sportland.com/media/wysiwyg/brandsHistoryBlockLogo/helly-hansen.png"
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
            @apply h-12 mx-6;
        }
    }


    @keyframes slide {
        100% {
            transform: translateX(-100%);
        }
    }
}
</style>
