<template>
    <div id="admin-product">
        <div class="admin-product-main container">
            <div class="breadcrumb">
                <span @click="routerService.routerLinkTo('/admin')">Admin</span>
                /
                <span class="active">Product</span>
            </div>

            <h1 class="headline">Product</h1>

            <p class="subtitle">
                This page enables you to add new products as well as update or
                delete existing ones.
            </p>

            <div class="product-stats section">
                <h2 class="my-2">Stats</h2>
                <p>1600+ products</p>
                <p>12 orders this week</p>
            </div>

            <div class="product-manage section">
                <h2 class="my-2">Manage products</h2>

                <p>Choose a category of products you would like to manage</p>

                <div v-if="categoriesList">
                    <select
                        v-model="categorySelect"
                        @change="
                            loadCategoryProducts(categorySelect.category_slug)
                        "
                        class="px-4 py-2 my-2"
                    >
                        <option value="" selected disabled>
                            Choose category
                        </option>
                        <option
                            v-for="(category, i) in categoriesList"
                            :key="i"
                            :value="category"
                        >
                            {{ category.category_name }}
                        </option>
                    </select>
                </div>

                <div v-if="categorySelect">
                    <p>
                        Editing products in category:
                        {{ categorySelect.category_name }}
                    </p>

                    <button
                        @click="toggleAddProduct()"
                        class="add-product-button"
                    >
                        <span>Add product</span>
                        <div
                            class="icon"
                            :class="isAddProductToggled && 'toggled'"
                        >
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
                    </button>
                    <div v-if="isAddProductToggled">
                        <AddProduct
                            :categoryId="categorySelect.id"
                            @cancel-product-add="cancelAddProduct()"
                            @update-categories-product-list="
                                loadCategoryProducts(
                                    categorySelect.category_slug
                                )
                            "
                        />
                    </div>

                    <div v-if="productsList" class="products-list">
                        <div
                            v-for="(product, i) in productsList"
                            :key="i"
                            class="product-item"
                        >
                            <div class="product-main">
                                <div class="product-id">
                                    <div class="product-name">
                                        {{ product.product_name }}
                                    </div>
                                    <div class="product-code">
                                        {{ product.code }}
                                    </div>
                                </div>

                                <div
                                    v-if="
                                        !product.isEditProductToggled &&
                                        !product.isDeleteProductToggled
                                    "
                                    class="product-actions"
                                >
                                    <button
                                        @click="toggleProductEdit(product)"
                                        class="product-edit-toggle"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        @click="toggleProductDelete(product)"
                                        class="product-delete-toggle"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div v-if="product.isEditProductToggled">
                                <EditProduct
                                    :product="product"
                                    @cancel-product-edit="
                                        toggleProductEdit(product)
                                    "
                                />
                            </div>
                            <div
                                v-if="product.isDeleteProductToggled"
                                class="product-delete-confirm"
                            >
                                <button
                                    @click="
                                        attemptProductDelete(
                                            product.product_slug,
                                            i
                                        )
                                    "
                                    class="product-delete-button"
                                >
                                    Delete
                                </button>
                                <button
                                    @click="toggleProductDelete(product)"
                                    class="product-delete-cancel"
                                >
                                    Cancel
                                </button>
                            </div>
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
import AddProduct from '@/components/admin/AddProduct.vue';
import EditProduct from '@/components/admin/EditProduct.vue';
import httpService from "@/services/http-service";

export default {
    name: 'Admin Artikal',

    components: {
        AddProduct,
        EditProduct,
    },

    setup() {
        let categoriesList = ref([]);
        let categorySelect = ref('');
        let isAddProductToggled = ref(false);
        let productsList = ref([]);
        let isEditProductToggled = ref(false);
        let isDeleteProductToggled = ref(false);

        let onInit = () => {
            const API_URL = 'categories-last';
            httpService
                .get(API_URL)
                .then((response) => {
                    categoriesList.value = response.data;

                    console.log('data 🔥');
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        let loadCategoryProducts = (slug) => {
            productsList.value = [];
            isEditProductToggled.value = false;
            isDeleteProductToggled.value = false;

            const API_URL = `categories/${slug}/products`;
            httpService
                .get(API_URL)
                .then((response) => {
                    productsList.value = response.data.products;

                    console.log('products data 👖');
                    console.log(productsList.value);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        let toggleAddProduct = () => {
            isAddProductToggled.value = !isAddProductToggled.value;
        };

        let cancelAddProduct = () => {
            isAddProductToggled.value = false;
        };

        let toggleProductEdit = (product) => {
            product.isEditProductToggled = !product.isEditProductToggled;
            product.isDeleteProductToggled = false;
        };

        let toggleProductDelete = (product) => {
            product.isDeleteProductToggled = !product.isDeleteProductToggled;
            product.isEditProductToggled = false;
        };

        let attemptProductDelete = (slug, index) => {
            const API_URL = `products/${slug}`;
            httpService
                .delete(API_URL)
                .then((response) => {
                    productsList.value.splice(index, 1);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        onInit();

        return {
            categoriesList,
            categorySelect,
            isAddProductToggled,
            productsList,
            isEditProductToggled,
            isDeleteProductToggled,

            onInit,
            loadCategoryProducts,
            toggleAddProduct,
            toggleProductEdit,
            toggleProductDelete,
            attemptProductDelete,
            cancelAddProduct,

            routerService,
            httpService,
        };
    },
};
</script>

<style lang="scss">
.admin-product-main {
    @apply my-10;

    .section {
        @apply my-8;
    }

    .product-manage {
        .add-product-button {
            @apply py-4 my-2 px-6 w-max flex flex-row items-center justify-center border
                hover:bg-gray-400 bg-gray-300
                dark:bg-gray-700 dark:hover:bg-gray-700;

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
    }

    .products-list {
        .product-item {
            @apply my-4 px-4 p-2 bg-red-500 bg-opacity-10
                hover:shadow-lg;

            .product-main {
                @apply flex flex-col justify-center items-start 
                    md:flex-row md:items-center md:justify-between;

                .product-id {
                    @apply flex flex-col my-2
                        md:my-0;

                    .product-name {
                        @apply text-lg tracking-wide;
                    }

                    .product-code {
                        @apply text-xs uppercase text-gray-600
                            dark:text-gray-300;
                    }
                }

                .product-actions {
                    @apply flex flex-row gap-2;

                    button {
                        @apply px-4 py-2 border;
                    }

                    .product-edit-toggle {
                        @apply border-blue-400 hover:bg-blue-400
                            dark:border-blue-900 dark:hover:bg-blue-900;
                    }

                    .product-delete-toggle {
                        @apply border-red-400 hover:bg-red-400
                            dark:border-red-800 dark:hover:bg-red-800;
                    }
                }
            }
        }

        .product-delete-confirm {
            @apply flex flex-row gap-2;

            button {
                @apply px-4 py-2 my-2 w-full;
            }

            .product-delete-button {
                @apply bg-red-400 hover:bg-red-500
                    dark:bg-red-800 dark:hover:bg-red-600;
            }
            .product-delete-cancel {
                @apply border border-gray-500 hover:bg-gray-500;
            }
        }
    }
}
</style>
