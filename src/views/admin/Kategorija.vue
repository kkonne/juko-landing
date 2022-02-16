<template>
    <div id="admin-kategorija">
        <div class="admin-category-main container">
            <div class="breadcrumb">
                <span @click="routerService.routerLinkTo('/admin')">Admin</span>
                /
                <span class="active">Kategorija</span>
            </div>

            Admin kategorija ae
        </div>
    </div>
</template>

<script lang="ts">
import routerService from '@/services/router-service';

export default {
    name: 'Admin Kategorija',

    setup() {
        return {
            routerService,
        };
    },
};
</script>

<style style="scss">
.admin-category-main {
    @apply my-10;
}
</style>
