<template>
    <div id="admin-index">
        <div class="admin-index-main container">

            <h1 class="headline">Admin panel</h1>

            <nav role="navigation" aria-roledescription="navigation">
                <div class="admin-routes">
                    <div
                        @click="routerService.routerLinkTo('/admin/artikal')"
                        class="admin-route-link"
                    >
                        Artikal
                    </div>

                    <div
                        @click="routerService.routerLinkTo('/admin/kategorija')"
                        class="admin-route-link"
                    >
                        Kategorija
                    </div>
                    
                    <div
                        @click="routerService.routerLinkTo('/admin/content')"
                        class="admin-route-link"
                    >
                        Content
                    </div>
                </div>
            </nav>

            <div class="admin-stats">
                <h3>Zanimljivosti hehe</h3>

                <Tooltip title="Upozorenje" text="Podaci se osvježavaju na 4-satnom intervalu." />

                <p>4 korisnika trenutno online</p>
                <p>17 narudžbi u zadnjih 24h</p>
                <p>4 narudžbe u procesu</p>
            </div>

            <div class="admin-add-users">
                <h3>Dodaj/prihvati nove korisnike</h3>
            </div>

            <div class="admin-stock">
                <h3>Pregledaj dostupnost na lageru:</h3>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import routerService from '@/services/router-service';
import Tooltip from '@/components/Tooltip.vue';

export default {
    name: 'Admin',

    components: {
        Tooltip,
    },

    setup() {
        return {
            routerService,
        };
    },
};
</script>

<style lang="scss">
.admin-index-main {
    @apply my-10;

    .admin-routes {
        @apply grid grid-cols-1 gap-2 py-10
            sm:grid-cols-3 md:gap-4;

        .admin-route-link {
            @apply cursor-pointer bg-red-800 text-gray-100 py-3 text-center
                hover:bg-red-900 dark:bg-red-300 dark:text-gray-900 dark:hover:bg-red-100;
        }
    }

    .admin-add-users {
        @apply my-6;
    }
}
</style>
