<template>
    <div id="admin-orders">
        <div class="admin-orders-main container">
            <div class="breadcrumb">
                <span @click="routerService.routerLinkTo('/admin')">Admin</span>
                /
                <span class="active">Orders</span>
            </div>

            <h1 class="headline">Orders</h1>

            <p class="subtitle">
                You can view, approve and decline orders here
            </p>

            <div v-if="ordersList.length" class="my-8">
                <div class="text-2xl">ORDERS 🗒</div>

                <div v-for="(order, i) in ordersList" :key="i" class="my-2">
                    <span>Items: {{ order.items.length }}</span>
                    <br />
                    <span class="text-xs">{{
                        new Date(order.created_at).toLocaleDateString()
                    }}</span>

                    <br />
                    <button
                        v-if="order.approved === null"
                        @click="attemptOrderApproval(order)"
                        type="button"
                        class="mr-2 my-1 px-2 py-1 border"
                    >
                        Approve
                    </button>

                    <div
                        v-if="order.approved === 0"
                        class="
                            h-2
                            w-2
                            bg-red-500 bg-opacity-70
                            rounded-full
                            m-2
                        "
                    ></div>
                    <div
                        v-if="order.approved === 1"
                        class="
                            h-2
                            w-2
                            bg-green-500 bg-opacity-70
                            rounded-full
                            m-2
                        "
                    ></div>
                    <div
                        v-if="order.approved === 2"
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
import routerService from '@/services/router-service';
import httpService from '@/services/http-service';

export default {
    name: 'Admin Content',

    setup() {
        const ordersList = ref([]);

        const onInit = () => {
            getOrders();
        };

        const getOrders = (): void => {
            const API_URL = `orders`;
            httpService
                .get(API_URL)
                .then((response) => {
                    console.log('response.data');
                    console.log(response.data);

                    ordersList.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const attemptOrderApproval = (orderData): void => {
            const API_URL = `approve-order/${orderData.id}`;
            httpService
                .post(API_URL)
                .then((response) => {
                    console.log('response.data');
                    console.log(response.data);

                    getOrders();
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        onInit();

        return {
            ordersList,

            onInit,
            getOrders,
            attemptOrderApproval,

            routerService,
        };
    },
};
</script>

<style lang="scss" scoped>
.admin-orders-main {
    @apply my-10;
}
</style>
