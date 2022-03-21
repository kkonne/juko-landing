<template>
    <div id="products-index">
        <div class="products-main container">
            <div class="products-main container">
                <div class="products-header">
                    <h1 class="headline">Products</h1>

                    <div class="subtitle">
                        Here you can browse our products...
                    </div>
                </div>

                <div v-if="categoriesList.length">
                    <div class="categories-wrap">
                        <div
                            class="category-item"
                            :class="productsList?.length && 'compact'"
                            v-for="(category, i) in categoriesList"
                            :key="i"
                            @click="selectCategory(category)"
                        >
                            <div class="image">Cat image</div>
                            <div class="title">
                                {{ category.category_name }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div v-if="productsList.length">
                    <div class="products-wrap">
                        <div
                            class="product-item"
                            v-for="(product, i) in productsList"
                            :key="i"
                        >
                            <div class="image">Prod image</div>
                            <div class="title">{{ product.product_name }}</div>
                        </div>
                    </div>
                </div> -->

                <div v-if="!categoriesList.length">
                    <div class="skeleton-wrap">
                        <div
                            v-for="(product, i) in [1, 2, 3, 4, 5, 6, 7, 8]"
                            :key="i"
                            class="skeleton-item"
                        >
                            <div class="image pulse"></div>
                            <div class="heading-main">
                                <div class="heading col-span-2 pulse"></div>
                                <div class="heading col-span-1 pulse"></div>
                            </div>
                            <div class="description pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import httpService from '@/services/http-service';
import routerService from '@/services/router-service';

export default {
    name: 'Products',

    setup() {
        let categoriesList = ref([]);
        let productsList = ref([]);

        const onInit = () => {
            const API_URL = 'categories';
            httpService
                .get(API_URL)
                .then((response) => {
                    categoriesList.value = response.data;

                    console.log('data 🔥');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const selectCategory = (category) => {
            console.log('category');
            console.log(category);

            const route = `/proizvodi/${category.category_slug}`;
            routerService.routerLinkTo(route);

            // if (category.children_categories.length) {
            //     categoriesList.value = category.children_categories;
            //     return;
            // }

            // const API_URL = `categories/${category.category_slug}/products`;
            // httpService
            //     .get(API_URL)
            //     .then((response) => {
            //         productsList.value = response.data[0].products;

            //         console.log('data 🔥');
            //         console.log(response.data);
            //         console.log(productsList.value);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        };

        onInit();

        return {
            categoriesList,
            productsList,

            selectCategory,
        };
    },
};
</script>

<style lang="scss" scoped>
.products-main {
    @apply my-10;

    .categories-wrap {
        @apply grid grid-cols-2 gap-2 my-8
            sm:grid-cols-3 md:grid-cols-4 md:gap-4;

        .category-item {
            @apply px-4 py-8 flex flex-col items-center gap-4 cursor-pointer
                bg-gray-500 bg-opacity-20;

            &.compact {
                @apply flex-row justify-center items-start gap-2 p-2;
            }
        }
    }

    .skeleton-wrap {
        @apply grid grid-cols-2 gap-2 my-8
            sm:grid-cols-3 md:grid-cols-4 md:gap-4;

        .skeleton-item {
            @apply flex flex-col p-4 bg-gray-300
                dark:bg-gray-700;

            .pulse {
                @apply animate-pulse bg-gray-400
                    dark:bg-gray-600;
            }

            .image {
                @apply w-20 h-20 rounded-full;
            }

            .heading-main {
                @apply grid grid-cols-3 gap-2 mt-4
                    md:gap-6;

                .heading {
                    @apply h-4 rounded;
                }
            }

            .description {
                @apply mt-3 h-12 rounded;
            }
        }
    }
}
</style>
