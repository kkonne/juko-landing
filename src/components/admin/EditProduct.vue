<template>
    <div id="edit-product" class="edit-product">
        <form @submit.prevent="attemptProductEdit()">
            <div class="edit-product-form-wrap">
                <div class="form-field">
                    <label for="productNameInputHr">Product name</label>
                    <input
                        v-model.trim="editProductNameInputHr"
                        @change="onProductDataChange()"
                        id="productNameInputHr"
                        type="text"
                        placeholder="Hrvatski"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editProductNameInputEn"
                        @change="onProductDataChange()"
                        id="productNameInputEn"
                        type="text"
                        placeholder="English"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editProductNameInputDe"
                        @change="onProductDataChange()"
                        id="productNameInputDe"
                        type="text"
                        placeholder="Deutsch"
                    />
                </div>

                <div class="form-field">
                    <label for="productDescriptionInputHr"
                        >Product description</label
                    >
                    <textarea
                        rows="3"
                        v-model.trim="editProductDescriptionInputHr"
                        @change="onProductDataChange()"
                        id="productDescriptionInputHr"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Hrvatski"
                    />
                </div>

                <div class="form-field">
                    <textarea
                        rows="3"
                        v-model.trim="editProductDescriptionInputEn"
                        @change="onProductDataChange()"
                        id="productDescriptionInputEn"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="English"
                    />
                </div>

                <div class="form-field">
                    <textarea
                        rows="3"
                        v-model.trim="editProductDescriptionInputDe"
                        @change="onProductDataChange()"
                        id="productDescriptionInputDe"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Deutsch"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model="editProductActiveInput"
                        @change="onProductDataChange()"
                        id="productActiveInput"
                        type="checkbox"
                        :checked="editProductActiveInput"
                    />
                    <label for="productActiveInput">Active</label>
                </div>
            </div>

            <div class="product-stock" v-if="productStockArray">
                <h3>Edit product stock</h3>
                <div
                    v-for="(stock, i) in productStockArray"
                    :key="i"
                    class="stock-list-wrap"
                >
                    <select
                        v-model="stock.size_id"
                        @change="onProductStockChanged()"
                        name="stock-size"
                        id="stock-size"
                    >
                        <option :value="stock.size_id" selected>
                            {{ !stock.size_id ? 'Choose size' : stock.size_id }}
                        </option>

                        <option
                            v-for="(size, i) in productSizes"
                            :key="i"
                            :value="size.id"
                        >
                            {{ size.value }}
                        </option>
                    </select>

                    <select
                        v-model="stock.color_id"
                        @change="onProductStockChanged()"
                        name="stock-color"
                        id="stock-color"
                    >
                        <option :value="stock.color_id" selected>
                            {{
                                !stock.color_id
                                    ? 'Choose color'
                                    : stock.color_id
                            }}
                        </option>

                        <option
                            v-for="(color, i) in productColors"
                            :key="i"
                            :value="color.id"
                        >
                            {{ color.value }}
                        </option>
                    </select>

                    <input
                        v-model="stock.amount"
                        @change="onProductStockChanged()"
                        type="number"
                        placeholder="Quantity"
                    />

                    <div
                        @click="deleteItemFromStockList(stock, i)"
                        class="delete-stock-icon"
                    >
                        <svg
                            viewBox="0 -256 1792 1792"
                            version="1.1"
                            width="100%"
                            height="100%"
                        >
                            <g
                                transform="matrix(1,0,0,-1,197.42373,1255.0508)"
                                id="g3743"
                            >
                                <path
                                    d="M 512,800 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z M 1152,76 v 948 H 256 V 76 Q 256,54 263,35.5 270,17 277.5,8.5 285,0 288,0 h 832 q 3,0 10.5,8.5 7.5,8.5 14.5,27 7,18.5 7,40.5 z M 480,1152 h 448 l -48,117 q -7,9 -17,11 H 546 q -10,-2 -17,-11 z m 928,-32 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 h -96 V 76 q 0,-83 -47,-143.5 -47,-60.5 -113,-60.5 H 288 q -66,0 -113,58.5 Q 128,-11 128,72 v 952 H 32 q -14,0 -23,9 -9,9 -9,23 v 64 q 0,14 9,23 9,9 23,9 h 309 l 70,167 q 15,37 54,63 39,26 79,26 h 320 q 40,0 79,-26 39,-26 54,-63 l 70,-167 h 309 q 14,0 23,-9 9,-9 9,-23 z"
                                    id="path3745"
                                    inkscape:connector-curvature="0"
                                    style="fill: #f66"
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                <button
                    @click.prevent="addToStockList()"
                    class="add-stock-button"
                >
                    Add stock item
                </button>
            </div>

            <div class="action-buttons">
                <button type="submit" class="button-edit">Edit</button>
                <button
                    @click="$emit('cancelProductEdit')"
                    class="button-cancel"
                >
                    Cancel
                </button>
            </div>

            <div class="message">
                <div v-if="productAddErrorMessage">
                    <Alert type="error" :message="productAddErrorMessage" />
                </div>
                <div v-if="productAddSuccessMessage">
                    <Alert type="success" :message="productAddSuccessMessage" />
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import httpService from '@/services/http-service';
import Alert from '@/components/Alert.vue';

export default {
    name: 'editProduct',

    components: {
        Alert,
    },

    props: {
        product: Object,
    },

    setup(props) {
        let parentCategoryId = ref(props.product.categoryId || 2);
        let product = ref(props.product);
        let editProductNameInputHr = ref(product.value.name_hr);
        let editProductNameInputEn = ref(product.value.name_en);
        let editProductNameInputDe = ref(product.value.name_de);
        let editProductDescriptionInputHr = ref(product.value.description_hr);
        let editProductDescriptionInputEn = ref(product.value.description_en);
        let editProductDescriptionInputDe = ref(product.value.description_de);
        let editProductActiveInput = ref(!!product.value.active);
        let productAddSuccess = ref(false);
        let productAddSuccessMessage = ref('');
        let productAddError = ref(false);
        let productAddErrorMessage = ref('');
        let productStockArray = ref([]);
        let productDataChanged = ref(false);
        let productStockChanged = ref(false);
        let productSizes = [
            { value: '41', id: 1 },
            { id: 2, value: '42' },
        ];
        let productColors = [
            { id: 1, name: 'Crna' },
            { id: 2, name: 'Crvena' },
        ];

        const API_URL = `products/${product.value.product_slug}/product-stocks`;
        httpService
            .get(API_URL)
            .then((response) => {
                productStockArray.value = response.data;
                console.log('productStockArray.value');
                console.log(productStockArray.value);
            })
            .catch((error) => {
                console.error(error);
            });

        let attemptProductEdit = (event) => {
            if (productDataChanged.value) {
                const API_URL = `product-stocks`;

                const data = {
                    category_id: product.value.category_id,
                    code: product.value.code,
                    name_hr: editProductNameInputHr.value,
                    name_en: editProductNameInputEn.value,
                    name_de: editProductNameInputDe.value,
                    description_hr: editProductDescriptionInputHr.value,
                    description_en: editProductDescriptionInputEn.value,
                    description_de: editProductDescriptionInputDe.value,
                    active: editProductActiveInput.value,
                    image_path: product.value.image_path,
                };

                httpService
                    .patch(API_URL, data)
                    .then((response) => {
                        displaySuccessMessage();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }

            if (productStockChanged.value) {
                const API_URL = `product-stocks`;

                let data = {
                    product_id: product.value.id,
                    product_stocks: [...productStockArray.value],
                };

                console.log('Product stocks data');
                console.log(data);

                httpService
                    .post(API_URL, data)
                    .then((response) => {
                        displaySuccessMessage();
                        console.log('Success!');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        };

        let handleOnFocusOut = (event) => {
            if (!event.target.value) {
                displayErrorMessage('All fields are required!');
            }
        };

        let displayErrorMessage = (errorMessage?: string) => {
            if (errorMessage) {
                productAddErrorMessage.value = errorMessage;
            } else {
                productAddErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }

            setTimeout(() => {
                productAddErrorMessage.value = '';
            }, 1000 * 5);
        };

        let displaySuccessMessage = (successMessage?: string) => {
            if (successMessage) {
                productAddSuccessMessage.value = successMessage;
            } else {
                productAddSuccessMessage.value =
                    'You have successfully edited this product!';
            }

            setTimeout(() => {
                productAddSuccessMessage.value = '';
            }, 1000 * 5);
        };

        let deleteItemFromStockList = (stock, index) => {
            if (stock.id === null) {
                productStockArray.value.splice(index, 1);
                return;
            }

            const API_URL = `product-stocks/${stock.id}`;
            httpService
                .delete(API_URL)
                .then((response) => {
                    productStockArray.value.splice(index, 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        let addToStockList = () => {
            let exampleJson = {
                amount: 0,
                price: 50,
                size_id: null,
                color_id: null,
                product_id: product.value.id,
                id: null,
                delivery_amount: null,
                delivery_date: null,
            };
            productStockArray.value.push(exampleJson);
        };

        const onProductStockChanged = () => {
            productStockChanged.value = true;
        };

        const onProductDataChange = () => {
            productDataChanged.value = true;
        };

        return {
            parentCategoryId,
            editProductNameInputHr,
            editProductNameInputEn,
            editProductNameInputDe,
            editProductDescriptionInputHr,
            editProductDescriptionInputEn,
            editProductDescriptionInputDe,
            editProductActiveInput,
            productAddSuccess,
            productAddSuccessMessage,
            productAddError,
            productAddErrorMessage,
            productStockArray,
            productDataChanged,
            productSizes,
            productColors,

            attemptProductEdit,
            handleOnFocusOut,
            displayErrorMessage,
            displaySuccessMessage,
            deleteItemFromStockList,
            addToStockList,
            onProductStockChanged,
            onProductDataChange,

            httpService,
        };
    },
};
</script>

<style lang="scss">
.edit-product {
    @apply my-4;

    .edit-product-form-wrap {
        @apply grid grid-cols-1 gap-2 my-2 items-end
            md:grid-cols-3 md:gap-4;

        input[type='text'],
        textarea {
            @apply w-full mt-2 p-2;

            &:focus {
                @apply outline-none shadow-sm border border-gray-500;
            }
        }

        input[type='radio'],
        input[type='checkbox'] {
            @apply mr-2;
        }
    }

    .product-stock {
        @apply my-4;

        .stock-list-wrap {
            @apply w-full grid grid-cols-1 gap-y-2 my-6
                md:grid-cols-10 md:gap-y-0 md:gap-x-2 md:my-2;

            > select,
            input {
                @apply p-2 col-span-3;
            }

            .delete-stock-icon {
                @apply h-6 w-full cursor-pointer self-center justify-self-center;
            }
        }

        .add-stock-button {
            @apply py-2 px-4 my-2 bg-gray-300
                hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700;
        }
    }

    .action-buttons {
        @apply flex gap-2;

        button {
            @apply w-full border p-2 my-2;
        }

        .button-edit {
            @apply border-green-400 hover:bg-green-400
                dark:border-green-700 dark:hover:bg-green-700;
        }

        .button-cancel {
            @apply border border-gray-500 hover:bg-gray-500;
        }
    }
}
.delete-stock-icon {
    @apply h-6 w-full cursor-pointer self-center justify-self-center;
}
</style>
