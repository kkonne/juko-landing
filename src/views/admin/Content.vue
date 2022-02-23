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
                <div
                    @click="selectPage(page)"
                    class="page-main select-page-button"
                >
                    <span>{{ page.name }}</span>
                    <div class="icon" :class="page.isSelected && 'toggled'">
                        <svg
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            width="100%"
                            height="100%"
                            viewBox="0 0 960 560"
                            enable-background="new 0 0 960 560"
                        >
                            <g>
                                <path
                                    d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937
		c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937
		c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                <div v-if="page.isSelected" class="assets-list">
                    <div
                        v-for="(asset, i) in page.assets"
                        :key="i"
                        class="asset-item"
                    >
                        <div class="asset-main">
                            <div class="asset-id">
                                <div class="asset-name">
                                    {{ asset.name }}
                                </div>
                            </div>

                            <div
                                v-if="
                                    !asset.isEditAssetToggled &&
                                    !asset.isDeleteAssetToggled
                                "
                                class="asset-actions"
                            >
                                <button
                                    @click="toggleAssetEdit(asset)"
                                    class="asset-edit-toggle"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                        <div v-if="asset.isEditAssetToggled">
                            <EditAsset
                                :asset="asset"
                                @cancel-asset-edit="toggleAssetEdit(asset)"
                            />
                        </div>
                        <div
                            v-if="asset.isDeleteAssetToggled"
                            class="asset-delete-confirm"
                        >
                            <button
                                @click="attemptAssetDelete(asset.asset_slug, i)"
                                class="asset-delete-button"
                            >
                                Delete
                            </button>
                            <button
                                @click="toggleAssetDelete(asset)"
                                class="asset-delete-cancel"
                            >
                                Cancel
                            </button>
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
import EditAsset from '@/components/admin/EditAsset.vue';

export default {
    name: 'Admin Content',

    components: {
        EditAsset,
    },

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
                        name: 'homepage_link',
                        hr: 'Naslovna',
                        en: 'Homepage',
                        de: 'Haus xD',
                    },
                    {
                        name: 'products_link',
                        hr: 'Proizvodi',
                        en: 'Products',
                        de: 'Produkte',
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
                        name: 'homepage_link',
                        hr: 'Naslovna',
                        en: 'Homepage',
                        de: 'Haus xD',
                    },
                    {
                        name: 'products_link',
                        hr: 'Proizvodi',
                        en: 'Products',
                        de: 'Produkte',
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
                        name: 'homepage_link',
                        hr: 'Naslovna',
                        en: 'Homepage',
                        de: 'Haus xD',
                    },
                    {
                        name: 'products_link',
                        hr: 'Proizvodi',
                        en: 'Products',
                        de: 'Produkte',
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
                        name: 'homepage_link',
                        hr: 'Naslovna',
                        en: 'Homepage',
                        de: 'Haus xD',
                    },
                    {
                        name: 'products_link',
                        hr: 'Proizvodi',
                        en: 'Products',
                        de: 'Produkte',
                    },
                ],
            },
        ];

        assetPagesData.value = data;

        const selectPage = (page) => {
            page.isSelected = !page.isSelected;
        };

        const toggleAssetEdit = (asset) => {
            asset.isEditAssetToggled = !asset.isEditAssetToggled;
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

<style lang="scss" scoped>
.admin-category-main {
    @apply my-10;

    .select-page-button {
        @apply py-4 mt-6 mb-2 px-6 w-full flex flex-row items-center justify-between
                bg-blue-200 dark:bg-blue-900 hover:shadow-lg;

        span {
            word-break: keep-all;
        }

        svg {
            @apply h-4 fill-current;
        }

        .icon {
            @apply ml-2;

            &.toggled {
                @apply transform rotate-180;
            }
        }
    }

    .assets-list {
        @apply px-2;

        .asset-item {
            @apply my-4 px-4 p-2 bg-red-500 bg-opacity-10
                hover:shadow-lg;

            .asset-main {
                @apply flex flex-row items-center justify-between;

                .asset-id {
                    @apply flex flex-col my-2
                        md:my-0;

                    .asset-name {
                        @apply text-lg tracking-wide;
                    }

                    .asset-code {
                        @apply text-xs uppercase text-gray-600
                            dark:text-gray-300;
                    }
                }

                .asset-actions {
                    @apply flex flex-row gap-2;

                    button {
                        @apply px-4 py-2 border;
                    }

                    .asset-edit-toggle {
                        @apply border-blue-400 hover:bg-blue-400
                            dark:border-blue-900 dark:hover:bg-blue-900;
                    }

                    .asset-delete-toggle {
                        @apply border-red-400 hover:bg-red-400
                            dark:border-red-800 dark:hover:bg-red-800;
                    }
                }
            }
        }

        .asset-delete-confirm {
            @apply flex flex-row gap-2;

            button {
                @apply px-4 py-2 my-2 w-full;
            }

            .asset-delete-button {
                @apply bg-red-400 hover:bg-red-500
                    dark:bg-red-800 dark:hover:bg-red-600;
            }
            .asset-delete-cancel {
                @apply border border-gray-500 hover:bg-gray-500;
            }
        }
    }
}
</style>
