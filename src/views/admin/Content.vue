<template>
    <div id="admin-kategorija">
        <div class="admin-category-main container">
            <div class="breadcrumb">
                <span @click="routerService.routerLinkTo('/admin')">Admin</span>
                /
                <span class="active">Content</span>
            </div>

            <h1 class="headline">Content</h1>

            <p class="subtitle">You can edit contents of the page here</p>

            <div v-for="(page, i) in assetPagesData" :key="i">
                {{ page.name }}

                <span @click="selectPage(page)">Select</span>

                <div v-if="page.isSelected">
                    <div v-for="(asset, i) in page.assets" :key="i + 'a'">
                        {{ asset.name }}

                        <span @click="toggleAssetEdit(asset)">Edit asset</span>

                        <div v-if="asset.isEditToggled">
                            <input v-model="editAssetInputHr" type="text" placeholder="Hrvatski" />
                            <input v-model="editAssetInputEn" type="text" placeholder="English" />
                            <input v-model="editAssetInputDe" type="text" placeholder="Deutsch" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import routerService from '@/services/router-service';

export default {
    name: 'Admin Content',

    setup() {
        let assetPagesData = ref([]);

        const data = [
            {
                id: 105921,
                name: 'Footer assets',
                route_frontend: '*',
                route_backend: '/assets/navbar',
                assets: [
                    {
                        name: "homepage_link",
                        hr: "Naslovna",
                        en: "Homepage",
                        de: "Haus xD",
                    },
                    {
                        name: "products_link",
                        hr: "Proizvodi",
                        en: "Products",
                        de: "Produkte"
                    },
                ],
            },
            {
                id: 105522,
                name: 'Homepage assets',
                route_frontend: '/',
                route_backend: '/assets/home',
                assets: [
                    {
                        name: "homepage_link",
                        hr: "Naslovna",
                        en: "Homepage",
                        de: "Haus xD",
                    },
                    {
                        name: "products_link",
                        hr: "Proizvodi",
                        en: "Products",
                        de: "Produkte"
                    },
                ],
            },
            {
                id: 92112,
                name: 'Footer assets',
                route_frontend: '*',
                route_backend: '/assets/footer',
                assets: [
                    {
                        name: "homepage_link",
                        hr: "Naslovna",
                        en: "Homepage",
                        de: "Haus xD",
                    },
                    {
                        name: "products_link",
                        hr: "Proizvodi",
                        en: "Products",
                        de: "Produkte"
                    },
                ],
            },
            {
                id: 93771,
                name: 'Partners assets',
                route_frontend: '/partners',
                route_backend: '/assets/partners',
                assets: [
                    {
                        name: "homepage_link",
                        hr: "Naslovna",
                        en: "Homepage",
                        de: "Haus xD",
                    },
                    {
                        name: "products_link",
                        hr: "Proizvodi",
                        en: "Products",
                        de: "Produkte"
                    },
                ],
            },
        ];

        assetPagesData.value = data;

        const selectPage = (page) => {
            page.isSelected = !page.isSelected;
        };
        
        const toggleAssetEdit = (asset) => {
            asset.isEditToggled = !asset.isEditToggled;
        };

        return {
            assetPagesData,

            selectPage,
            toggleAssetEdit,

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
