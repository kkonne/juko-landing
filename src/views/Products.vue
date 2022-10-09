<template>
    <div id="products">
        <div class="products-wrap">
            <div class="container">
                <h1 class="headline">Proizvodi</h1>

                <p class="subtitle">Pregled proizvoda koje nudimo za Vas</p>

                <div class="products-list">
                    <div
                        v-for="(product, index) of products"
                        :key="index"
                        class="product"
                    >
                        <img
                            :src="product.image_path"
                            :alt="product.name"
                            class="icon"
                        />

                        <span class="title">{{ product.name }}</span>
                    </div>
                </div>
            </div>

            <div class="divider"></div>
            <div class="contact">
                <p class="contact-info">Za sve ostale informacije:</p>
                <button
                    type="button"
                    class="contact-btn"
                    @click="routerService.routerLinkTo('/contact')"
                >
                    Kontaktirajte nas
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import routerService from '@/services/router-service';

export default {
    name: 'Products',

    setup() {
        const products = [
            {
                name: 'Radna odjeća',
                image_path:
                    'https://cdn-icons-png.flaticon.com/512/65/65418.png',
            },
            {
                name: 'Radna obuća',
                image_path:
                    'https://cdn-icons-png.flaticon.com/512/3531/3531605.png',
            },
            {
                name: 'Radne i zaštitne rukavice',
                image_path:
                    'https://uxwing.com/wp-content/themes/uxwing/download/clothes-and-accessories/hand-gloves-protective-icon.png',
            },
            {
                name: 'Zaštita respiratornog sustava',
                image_path:
                    'https://cdn-icons-png.flaticon.com/512/250/250178.png',
            },
            {
                name: 'Zaštita glave i lica',
                image_path:
                    'https://www.iconpacks.net/icons/2/free-helmet-icon-2734-thumb.png',
            },
            {
                name: 'HoReCa program',
                image_path:
                    'https://gogeticon.net/files/3052356/6b796dd35278046421666a235701e21e.png',
            },
            {
                name: 'Šivani program',
                image_path:
                    'https://cdn-icons-png.flaticon.com/512/808/808726.png',
            },
            {
                name: 'Jednokratni program',
                image_path:
                    'https://cdn4.iconfinder.com/data/icons/pixa-vol-3/160/reflective-vest-512.png',
            },
        ];

        return {
            products,

            routerService,
        };
    },
};
</script>

<style lang="scss" scoped>
.products-wrap {
    .products-list {
        @apply my-10 grid grid-cols-2 gap-4
            md:grid-cols-3 sm:gap-6;

        .product {
            @apply flex flex-col justify-center items-center gap-4 bg-gray-300 
                p-6 text-gray-900 cursor-pointer border border-black
                hover:shadow-lg hover:bg-gray-400;

            .icon {
                @apply max-w-full h-16;
            }

            .title {
                @apply text-xl text-center;
            }
        }
    }

    .contact {
        @apply flex flex-col justify-center items-center py-8 bg-blue-200
            dark:bg-blue-900;

        .contact-info {
            @apply font-bold;
        }

        .contact-btn {
            @apply bg-gray-800 text-gray-100 tracking-wider text-lg px-8 py-2 mt-2
                rounded-md mb-12 lg:mb-16
                hover:bg-gray-900 hover:text-gray-50;
        }
    }

    .divider {
        @apply w-full h-24 lg:h-32 bg-blue-200 mt-24
            dark:bg-blue-900;
        border-top-left-radius: 100%;
        border-top-right-radius: 100%;
    }
}
</style>
