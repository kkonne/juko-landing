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

            <div v-if="userOrdersList.length" class="my-8">
                <div class="text-2xl">ORDERS 🗒</div>

                <div
                    v-for="(userOrder, i) in userOrdersList"
                    :key="i"
                    class="my-2"
                >
                    <span>Items: {{ userOrder.items.length }}</span>
                    <br />
                    <span class="text-xs">{{
                        new Date(userOrder.created_at).toLocaleDateString()
                    }}</span>

                    <br />
                    <button
                        v-if="userOrder.approved === null"
                        @click="attemptOrderDecline(userOrder)"
                        type="button"
                        class="mr-2 my-1 px-2 py-1 border"
                    >
                        Cancel
                    </button>

                    <div
                        v-if="userOrder.approved === 0"
                        class="
                            h-2
                            w-2
                            bg-red-500 bg-opacity-70
                            rounded-full
                            m-2
                        "
                    ></div>
                    <div
                        v-if="userOrder.approved === 1"
                        class="
                            h-2
                            w-2
                            bg-green-500 bg-opacity-70
                            rounded-full
                            m-2
                        "
                    ></div>
                    <div
                        v-if="userOrder.approved === 2"
                        class="
                            h-2
                            w-2
                            bg-blue-500 bg-opacity-70
                            rounded-full
                            m-2
                        "
                    ></div>
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

                    userOrdersList.value = response.data;
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
}
</style>
