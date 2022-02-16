<template>
    <div id="proizvodi-index">
        <div class="products-main container">
            <div class="products-header">
                <h1 class="headline">Products</h1>
                <div class="subtitle">Here you can browse our products...</div>
            </div>

            <div class="products-wrap">
                <!-- <div class="product" v-for="(product, i) in apiData.data" :key="i"> -->
                <div
                    class="product"
                    v-for="(product, i) in mockData.data"
                    :key="i"
                >
                    <div class="product-icon">
                        <img width="100%" height="100%" :src="product.icon" />
                    </div>

                    <div class="product-title">{{ product.name.hr }}</div>
                    <!-- <router-link to="/proizvodi/odjeca">Odjeća</router-link> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    setup() {
        let mockData = ref({
            currentEndpoint: 'api/proizvodi',
            currentLang: 'hr',
            endpoint: {
                hr: 'api/proizvodi',
                en: 'api/products',
                de: 'api/produkte',
            },
            data: [
                {
                    id: 71,
                    name: {
                        hr: 'Odjeća',
                        en: 'Garments',
                    },
                    slug: {
                        hr: 'odjeca',
                        en: 'garments',
                    },
                    api_endpoint: {
                        en: '/api/garments/all',
                        hr: '/api/proizvodi/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3w2NDd8aW1hZ2Uvc3ZnK3htbHw4ODI0MTc3NDU5MjMwfGJmOTA0MGQ2OWY1ZTk3ZjMwYTY1YzM2OWNkMmYwMmJlM2ZmNDQyZjU2OTU3Y2M4YjE1MzRhODE2M2VkMjc3ZGQ',
                },
                {
                    id: 72,
                    name: {
                        hr: 'Obuća',
                        en: 'Shoes',
                    },
                    slug: {
                        hr: 'obuca',
                        en: 'shoes',
                    },
                    api_endpoint: {
                        en: '/api/shoes/all',
                        hr: '/api/cipele/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxOTMwfGltYWdlL3N2Zyt4bWx8ODgyNDE4MTUyMjQ2MnxmZDAwOWI1YTUzOGM1YjM4ZmNjNmU0NDRhY2MzZTE3NmFkNGZlZWIwMGNjZjA0NzEyNTdmNzI3ZWYzMDViMjBl',
                },
                {
                    id: 73,
                    name: {
                        hr: 'Rukavice',
                        en: 'Gloves',
                    },
                    slug: {
                        hr: 'rukavice',
                        en: 'gloves',
                    },
                    api_endpoint: {
                        en: '/api/gloves/all',
                        hr: '/api/rukavice/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxMDQwfGltYWdlL3N2Zyt4bWx8ODgyNDE3NzcyMTM3NHw2ZmY0MTczZDgxY2U3MzMxYjRhOGM1NzVlNjkyMmNlYTY4ZDM0MzBiY2E1YWQyN2E2NDI0MmY5ZTE3ZTdiOTUz',
                },
                {
                    id: 74,
                    name: {
                        hr: 'Zaštita sluha',
                        en: 'Hearing protection',
                    },
                    slug: {
                        hr: 'zastita-sluha',
                        en: 'hearing-protection',
                    },
                    api_endpoint: {
                        en: '/api/hearing-protection/all',
                        hr: '/api/zastita-uha/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxMTY1fGltYWdlL3N2Zyt4bWx8ODgyNDE3OTAzMjA5NHw2Y2NiMDc5ZTY5YjNlOTcyNjEwMTU5ZmQ3MmIyZWY1YWY4ZjBlM2MyM2EzOGUzYjI1MjFhOGY4ZGQ2MjZmNjI3',
                },
                {
                    id: 72,
                    name: {
                        hr: 'Obuća',
                        en: 'Shoes',
                    },
                    slug: {
                        hr: 'obuca',
                        en: 'shoes',
                    },
                    api_endpoint: {
                        en: '/api/shoes/all',
                        hr: '/api/cipele/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxOTMwfGltYWdlL3N2Zyt4bWx8ODgyNDE4MTUyMjQ2MnxmZDAwOWI1YTUzOGM1YjM4ZmNjNmU0NDRhY2MzZTE3NmFkNGZlZWIwMGNjZjA0NzEyNTdmNzI3ZWYzMDViMjBl',
                },
                {
                    id: 73,
                    name: {
                        hr: 'Rukavice',
                        en: 'Gloves',
                    },
                    slug: {
                        hr: 'rukavice',
                        en: 'gloves',
                    },
                    api_endpoint: {
                        en: '/api/gloves/all',
                        hr: '/api/rukavice/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxMDQwfGltYWdlL3N2Zyt4bWx8ODgyNDE3NzcyMTM3NHw2ZmY0MTczZDgxY2U3MzMxYjRhOGM1NzVlNjkyMmNlYTY4ZDM0MzBiY2E1YWQyN2E2NDI0MmY5ZTE3ZTdiOTUz',
                },
                {
                    id: 74,
                    name: {
                        hr: 'Zaštita sluha',
                        en: 'Hearing protection',
                    },
                    slug: {
                        hr: 'zastita-sluha',
                        en: 'hearing-protection',
                    },
                    api_endpoint: {
                        en: '/api/hearing-protection/all',
                        hr: '/api/zastita-uha/sve',
                    },
                    icon: 'https://www.cerva.com/medias/?context=bWFzdGVyfGltYWdlc3wxMTY1fGltYWdlL3N2Zyt4bWx8ODgyNDE3OTAzMjA5NHw2Y2NiMDc5ZTY5YjNlOTcyNjEwMTU5ZmQ3MmIyZWY1YWY4ZjBlM2MyM2EzOGUzYjI1MjFhOGY4ZGQ2MjZmNjI3',
                },
            ],
            text: {
                title: {
                    hr: 'Proizvodi',
                    en: 'Products',
                },
                subtitle: {
                    hr: 'Na ovoj stranici možete pogeldati sve proizvode koje nudimo...',
                    en: 'Browse all of our available products',
                },
            },
        });
    
        return {
            mockData,
        }
    },
};
</script>

<style lang="scss">
.products-main {
    @apply my-10;

    .products-header {
        @apply my-5;
    }

    .products-wrap {
        @apply grid grid-cols-2 gap-2 py-10 cursor-pointer
            sm:grid-cols-3 md:grid-cols-4 md:gap-4;

        .product {
            @apply p-2 bg-red-50 hover:shadow-lg;

            .product-icon {
                @apply w-full p-4;

                img {
                    @apply w-full h-full;
                }
            }

            .product-title {
                @apply font-bold uppercase mx-4 my-2;
            }
        }
    }
}
</style>
