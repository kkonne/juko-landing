<template>
    <div id="artikal-index">
        <div class="product container">Zezanje na artiklu</div>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import { ref } from 'vue';
import httpService from '@/services/http-service';

export default {
    name: 'Artikal',

    setup() {
        let productData = ref(null);
        let productStockData = ref(null);
        let routeRef = ref(router.currentRoute);

        const getProductStockData = (productSlug) => {
            const API_URL = `products/${productSlug}/product-stocks`;
            httpService
                .get(API_URL)
                .then((response) => {
                    productStockData.value = response.data;

                    console.log('product stock data 🚀');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getProductData = () => {
            const currentRouteParam = routeRef.value.params.id;
            const API_URL = `products/${currentRouteParam}`;
            httpService
                .get(API_URL)
                .then((response) => {
                    productData.value = response.data;

                    getProductStockData(response.data.product_slug);

                    console.log('product data 🚀');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const onInit = () => {
            getProductData();
        };

        onInit();

        return {
            productData,
            productStockData,
            routeRef,

            onInit,
            getProductData,
            getProductStockData,
        };
    },
};
</script>

<style lang="scss">
.product {
    @apply my-10;
}
</style>
