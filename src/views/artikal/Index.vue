<template>
    <div id="artikal-index">
        <div class="product container">
            <section v-if="productData">
                <h1>{{ productData.product_name }}</h1>

                <div class="product-content">
                    <div class="product-image">
                        <img
                            :src="'https://www.bipensiero.com/immagini/articoli/600x600/K3032.jpg'"
                            :alt="productData.product_name"
                        />
                    </div>

                    <div class="product-data">
                        <div v-if="availableColors && productColorOptions">
                            Pick a color:
                            <div
                                v-for="(colorStock, i) in availableColors"
                                :key="i"
                            >
                                <input
                                    v-model="orderItemColorInput"
                                    id="productColor"
                                    :value="colorStock"
                                    type="radio"
                                    @change="handleColorSelect()"
                                />
                                <label for="productColor">{{
                                    productColorOptions[colorStock].color_name
                                }}</label>
                            </div>
                        </div>

                        <div v-if="availableSizes && productSizeOptions">
                            Pick a size:
                            <div
                                v-for="(sizeStock, i) in availableSizes"
                                :key="i"
                            >
                                <input
                                    v-model="orderItemSizeInput"
                                    id="productSize"
                                    :value="sizeStock"
                                    type="radio"
                                    @change="handleSizeSelect()"
                                />
                                <label for="productSize">{{
                                    productSizeOptions[sizeStock].value
                                }}</label>
                            </div>
                        </div>

                        <div v-if="orderItemColorInput && orderItemSizeInput">
                            Amount:

                            <input
                                type="number"
                                v-model="orderItemAmountInput"
                                name="productAmount"
                            />
                        </div>

                        <button
                            v-if="
                                orderItemColorInput &&
                                orderItemSizeInput &&
                                orderItemAmountInput
                            "
                            type="button"
                            @click="attemptAddItemToCart()"
                        >
                            Add to cart
                        </button>

                        <section
                            v-if="productStockAddedToCart.length"
                            class="stock-in-cart"
                        >
                            <span class="headline">Already in cart:</span>

                            <div
                                v-for="(
                                    stockItem, i
                                ) in productStockAddedToCart"
                                :key="i"
                                class="stock-item"
                            >
                                <div class="stock-details">
                                    <div class="stock-amount">
                                        Amount:
                                        {{ stockItem.amount }}
                                    </div>
                                    <div class="stock-color">
                                        {{
                                            productColorOptions[
                                                stockItem.color_id
                                            ].color_name
                                        }}
                                    </div>
                                    <div class="stock-size">
                                        {{
                                            productSizeOptions[
                                                stockItem.size_id
                                            ].value
                                        }}
                                    </div>
                                </div>
                                <button
                                    @click="attemptCartItemDelete(stockItem)"
                                    type="button"
                                    class="delete-button"
                                >
                                    <inline-svg
                                        :src="
                                            require('@/assets/images/trash-icon.svg')
                                        "
                                        fill="#d93434"
                                    ></inline-svg>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import router from '@/router';
import httpService from '@/services/http-service';
import cartStore from '@/store/cart';
import userService from '@/services/user-service';

export default {
    name: 'Artikal',

    setup() {
        const { getCart, getCartItemsCount, addToCart, removeFromCart } =
            cartStore;
        const isUserLoggedIn = ref(userService.isUserLoggedIn);
        let productData = ref(null);
        let productColorOptions = ref(null);
        let availableColors = ref(null);
        let productSizeOptions = ref(null);
        let availableSizes = ref(null);
        let productStockData = ref(null);
        let orderItemColorInput = ref(null);
        let orderItemSizeInput = ref(null);
        let orderItemAmountInput = ref(1);
        let orderItemStockId = ref(1);
        let productStockAddedToCart = ref([]);
        let routeRef = ref(router.currentRoute);

        const onInit = () => {
            getProductData();
        };

        const loadIfItemExistsInCart = () => {
            if (!getCartItemsCount.value) {
                return;
            }

            const cartItems = getCart.value.items;
            const cartStocksArr = cartItems.map((cartItem) => {
                return cartItem.stock_id;
            });
            let cartObj = {};
            cartItems.forEach((cartItem) => {
                cartObj[cartItem.stock_id] = cartItem.amount;
            });

            const modifiedProductStockArr = productStockData.value
                .filter((stockItem) => {
                    return cartStocksArr.includes(stockItem.id);
                })
                .map((stockItem) => {
                    stockItem.amount = cartObj[stockItem.id];
                    return stockItem;
                });

            productStockAddedToCart.value = modifiedProductStockArr;
        };

        const getProductStockData = (productSlug) => {
            const API_URL = `products/${productSlug}/product-stocks`;
            httpService
                .get(API_URL)
                .then((response) => {
                    productStockData.value = response.data;

                    const availableColorsArr = productStockData.value.map(
                        (stockItem) => {
                            return stockItem.color_id;
                        }
                    );
                    availableColors.value = [...new Set(availableColorsArr)];

                    loadIfItemExistsInCart();
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getColorOptions = () => {
            const API_URL = `colors`;
            httpService
                .get(API_URL)
                .then((response) => {
                    let colorOptionsObj = {};
                    response.data.map((color) => {
                        colorOptionsObj[color.id] = color;
                    });
                    productColorOptions.value = colorOptionsObj;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getSizeOptions = () => {
            const API_URL = `sizes`;
            httpService
                .get(API_URL)
                .then((response) => {
                    let sizeOptionsObj = {};
                    response.data.map((size) => {
                        sizeOptionsObj[size.id] = size;
                    });
                    productSizeOptions.value = sizeOptionsObj;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getProductData = () => {
            const currentRouteParam = routeRef.value.params.productSlug;
            const API_URL = `products/${currentRouteParam}`;
            httpService
                .get(API_URL)
                .then((response) => {
                    productData.value = response.data;

                    getColorOptions();
                    getSizeOptions();
                    getProductStockData(response.data.product_slug);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const handleColorSelect = () => {
            orderItemSizeInput.value = null;
            orderItemAmountInput.value = 1;

            let availableSizesArr = productStockData.value.filter(
                (stockItem) => {
                    if (stockItem.color_id === orderItemColorInput.value) {
                        return stockItem.size_id;
                    }
                }
            );
            availableSizesArr = availableSizesArr.map((stockItem) => {
                return stockItem.size_id;
            });
            availableSizesArr = [...new Set(availableSizesArr)];

            availableSizes.value = availableSizesArr;
        };

        const handleSizeSelect = () => {
            orderItemAmountInput.value = 1;

            let stockId =
                productStockData.value.filter((stockItem) => {
                    let { color_id, size_id } = stockItem;
                    return (
                        orderItemSizeInput.value === size_id &&
                        orderItemColorInput.value === color_id
                    );
                })[0].id || null;

            orderItemStockId.value = stockId;
        };

        const attemptAddItemToCart = () => {
            const stockObj = {
                stock_id: orderItemStockId.value,
                amount: orderItemAmountInput.value,
            };

            addToCart(stockObj);
            loadIfItemExistsInCart();
        };

        const attemptCartItemDelete = (cartItem) => {
            removeFromCart(cartItem.stock_id, cartItem.amount);
            loadIfItemExistsInCart();
        };

        onInit();

        return {
            isUserLoggedIn,
            productData,
            availableColors,
            productColorOptions,
            productSizeOptions,
            availableSizes,
            productStockData,
            orderItemColorInput,
            orderItemSizeInput,
            orderItemAmountInput,
            orderItemStockId,
            productStockAddedToCart,
            routeRef,

            onInit,
            getProductData,
            getProductStockData,
            getColorOptions,
            getSizeOptions,
            handleColorSelect,
            handleSizeSelect,
            attemptAddItemToCart,
            loadIfItemExistsInCart,
            removeFromCart,
            attemptCartItemDelete,
        };
    },
};
</script>

<style lang="scss" scoped>
.product {
    @apply my-10;

    .product-content {
        @apply my-6 flex flex-row gap-4;

        .stock-in-cart {
            @apply my-4;

            .headline {
                @apply italic text-gray-500;
            }

            .stock-item {
                @apply flex flex-col items-start gap-2 px-2 py-4 my-2 rounded-lg bg-gray-300
                    dark:bg-gray-800;

                .stock-details {
                    @apply flex flex-row items-center;

                    .stock-amount {
                        @apply mx-2;
                    }

                    .stock-color {
                        @apply mx-2;
                    }

                    .stock-size {
                        @apply rounded mx-2 px-2 py-1 bg-gray-400
                            dark:bg-gray-700;
                    }
                }

                .delete-button {
                    @apply mx-2 px-1 py-0.5 border border-red-500 border-opacity-50 rounded
                        hover:bg-red-500 hover:bg-opacity-20;
                }
            }
        }
    }
}
</style>
