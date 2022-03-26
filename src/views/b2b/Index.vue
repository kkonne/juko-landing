<template>
    <div id="b2b">
        <div class="b2b-main container">
            <h1>Welcome {{ userName }}</h1>

            <div class="my-8" v-if="cartItems">
                <div class="text-2xl">CART 🛒</div>

                <div v-for="(cartItem, i) in cartItems" :key="i">
                    {{ cartItem.amount }}
                </div>
            </div>

            <button @click="attemptOrder()" type="button">Order items</button>
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
        let cartItems = ref(null);

        const onInit = (): void => {
            cartItems.value = getCart.value.items;
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

        onInit();

        return {
            userName,
            cartItems,

            onInit,
            attemptOrder,
        };
    },
};
</script>

<style lang="scss">
.b2b-main {
    @apply my-10;
}
</style>
