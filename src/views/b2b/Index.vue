<template>
    <div id="b2b">
        <div class="b2b-main container">
            <h1>Welcome {{ userName }}</h1>

            <div v-if="cartItems.length" class="my-8">
                <div class="text-2xl">CART 🛒</div>

                <div v-for="(cartItem, i) in cartItems" :key="i">
                    {{ cartItem.amount }}
                </div>

                <button @click="attemptOrder()" type="button">
                    Order items
                </button>
            </div>

            <div v-if="userOrdersList.length" class="order-list">
                <div class="order-title">ORDERS 🗒</div>

                <div
                    v-for="(userOrder, i) in userOrdersList"
                    :key="i"
                    class="order-item"
                >
                    <span class="order-date">{{
                        new Date(userOrder.created_at).toLocaleDateString()
                    }}</span>
                    <span class="order-items"
                        >Items: {{ userOrder.items.length }}</span
                    >
                    <span class="order-price"
                        >{{ userOrder.price }} BAM</span
                    >

                    <button
                        v-if="userOrder.approved === null"
                        @click="attemptOrderDecline(userOrder)"
                        type="button"
                        class="my-1 px-2 py-1 border ml-auto"
                    >
                        Cancel
                    </button>

                    <div
                        v-if="userOrder.approved === 0"
                        class="text-red-500 ml-auto my-1 px-2 py-1"
                    >
                        Declined
                    </div>
                    <div
                        v-if="userOrder.approved === 1"
                        class="text-green-500 ml-auto my-1 px-2 py-1"
                    >
                        Approved
                    </div>
                    <div
                        v-if="userOrder.approved === 2"
                        class="text-blue-500 ml-auto my-1 px-2 py-1"
                    >
                        Pending...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import authStore from '@/store/auth';
import cartStore from '@/store/cart';
import httpService from '@/services/http-service';
export default {
    name: 'B2b',

    setup() {
        const { getUser } = authStore;
        const { getCart } = cartStore;
        let userName = ref(getUser.value?.name);
        let cartItems = ref([]);
        let userOrdersList = ref([]);

        const onInit = (): void => {
            cartItems.value = getCart.value.items || [];
            getUserOrders();
        };

        const attemptOrder = () => {
            const data = {
                items: cartItems.value,
            };
            const API_URL = 'orders';
            httpService
                .post(API_URL, data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getUserOrders = (): void => {
            const { id } = getUser.value;
            const API_URL = `user/${id}/orders`;
            httpService
                .get(API_URL)
                .then((response) => {
                    console.log('response.data');
                    console.log(response.data);

                    const { data } = response;
                    const userOrdersMapped = data.map((order) => {
                        return {
                            ...order,
                            price: order.items.reduce(
                                (previousValue, currentValue) =>
                                    previousValue + currentValue.price,
                                0
                            ),
                        };
                    });

                    console.log('userOrdersMapped');
                    console.log(userOrdersMapped);

                    userOrdersList.value = userOrdersMapped;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const attemptOrderDecline = (orderData): void => {
            const API_URL = `decline-order/${orderData.id}`;
            console.log('Attempted order decline: ');
            console.log('Order data: ', orderData);
            console.log('API URL: ', API_URL);

            // httpService
            //     .post(API_URL)
            //     .then((response) => {
            //         console.log('response.data');
            //         console.log(response.data);

            //         getUserOrders();
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        };

        onInit();

        return {
            userName,
            cartItems,
            userOrdersList,

            onInit,
            attemptOrder,
            getUserOrders,
            attemptOrderDecline,
        };
    },
};
</script>

<style lang="scss">
.b2b-main {
    @apply my-10;

    .order-list {
        @apply my-8;

        .order-title {
            @apply text-2xl my-4;
        }

        .order-item {
            @apply my-2 py-4 px-2 flex items-center gap-6;

            &:nth-child(even) {
                @apply bg-gray-500 bg-opacity-20;
            }

            &:hover {
                @apply bg-gray-500 bg-opacity-50;
            }

            .order-date {
                @apply text-sm text-gray-700
                    dark:text-gray-300;
            }

            .order-price {
                @apply font-bold;
            }
        }
    }
}
</style>
