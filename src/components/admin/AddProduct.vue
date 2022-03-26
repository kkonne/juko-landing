<template>
    <div id="add-product">
        <form @submit.prevent="attemptProductAdd($event)">
            <div class="form-inputs-wrap">
                <div class="product-data-inputs">
                    <div class="form-field">
                        <label for="productNameInputHr">Product name</label>
                        <input
                            v-model.trim="addProductNameInputHr"
                            id="productNameInputHr"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="Hrvatski"
                        />
                    </div>

                    <div class="form-field">
                        <input
                            v-model.trim="addProductNameInputEn"
                            id="productNameInputEn"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="English"
                        />
                    </div>

                    <div class="form-field">
                        <input
                            v-model.trim="addProductNameInputDe"
                            id="productNameInputDe"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="Deutsch"
                        />
                    </div>
                </div>

                <div class="product-data-inputs">
                    <div class="form-field">
                        <label for="productDescriptionInputHr"
                            >Product description</label
                        >
                        <textarea
                            rows="3"
                            v-model.trim="addProductDescriptionInputHr"
                            id="productDescriptionInputHr"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="Hrvatski"
                        />
                    </div>

                    <div class="form-field">
                        <textarea
                            rows="3"
                            v-model.trim="addProductDescriptionInputEn"
                            id="productDescriptionInputEn"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="English"
                        />
                    </div>

                    <div class="form-field">
                        <textarea
                            rows="3"
                            v-model.trim="addProductDescriptionInputDe"
                            id="productDescriptionInputDe"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="Deutsch"
                        />
                    </div>
                </div>

                <div class="product-data-inputs">
                    <div class="form-field">
                        <label for="productCodeInput">Product code</label>
                        <input
                            v-model.trim="addProductCodeInput"
                            id="productCodeInput"
                            type="text"
                            @blur="handleOnFocusOut($event)"
                            placeholder="eg. KB1937A"
                        />
                    </div>

                    <div class="form-field">
                        <label for="productSexInput">Sex</label>
                        <div id="productSexInput">
                            <input
                                v-model="addProductSexInput"
                                id="productSexInput1"
                                value="0"
                                type="radio"
                            />
                            <label for="productSexInput1">Male</label>
                            <br />
                            <input
                                v-model="addProductSexInput"
                                id="productSexInput2"
                                value="1"
                                type="radio"
                            />
                            <label for="productSexInput2">Female</label>
                            <br />
                            <input
                                v-model="addProductSexInput"
                                id="productSexInput3"
                                value="3"
                                type="radio"
                            />
                            <label for="productSexInput3">Unisex</label>
                        </div>
                    </div>

                    <div class="form-field">
                        <input
                            type="checkbox"
                            id="productActiveInput"
                            v-model="addProductActiveInput"
                        />
                        <label for="productActiveInput">Active</label>
                    </div>

                    <div class="form-field custom-file-upload">
                        <div>
                            Product image
                            <span class="text-muted">Max 10 MB</span>
                        </div>
                        <label for="productImageInput">
                            <input
                                type="file"
                                id="productImageInput"
                                @change="handleImageInput($event)"
                            />
                            Choose file
                        </label>

                        <div class="mt-8">
                            <div v-if="addProductImageInput">
                                File: {{ addProductImageInput.name }}
                            </div>
                            <div v-if="!addProductImageInput">
                                No file selected.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <button
                v-if="!productStockConfirm"
                @click.prevent="toggleproductStockConfirmation()"
                class="toggle-add-button"
            >
                Continue with product stock
            </button>
            <div v-if="productStockConfirm">
                <div class="add-stock">
                    <h5>Product stock:</h5>
                    <div
                        v-for="(stock, i) in productStockArray"
                        :key="i"
                        class="stock-list-wrap"
                    >
                        <select
                            v-model="stock.size_id"
                            name="stock-size"
                            id="stock-size"
                        >
                            <option value="" selected disabled>
                                Choose size
                            </option>
                            <option
                                v-for="(size, i) in productSizeOptions"
                                :key="i"
                                :value="size.id"
                            >
                                {{ size.value }}
                            </option>
                        </select>

                        <select
                            v-model="stock.color_id"
                            name="stock-color"
                            id="stock-color"
                        >
                            <option value="" selected disabled>
                                Choose color
                            </option>
                            <option
                                v-for="(color, i) in productColorOptions"
                                :key="i"
                                :value="color.id"
                            >
                                {{ color.color_name }}
                            </option>
                        </select>

                        <input
                            v-model="stock.amount"
                            type="number"
                            placeholder="Količina"
                        />

                        <div
                            @click.prevent="deleteItemFromStockList(i)"
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
                        Add size
                    </button>
                </div>

                <Tooltip title="Tip" text="Provjerite točnost podataka." />

                <div class="confirm-buttons">
                    <button type="submit" class="add-product-button">
                        Add
                    </button>
                    <button
                        @click.prevent="$emit('cancelProductAdd')"
                        class="add-product-cancel-button"
                    >
                        Cancel
                    </button>
                </div>
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
import Tooltip from '@/components/Tooltip.vue';
import Alert from '@/components/Alert.vue';

export default {
    name: 'AddProduct',

    components: {
        Tooltip,
        Alert,
    },

    props: {
        categoryId: Number,
    },

    setup(props, context) {
        let parentCategoryId = ref(props.categoryId);
        let addProductNameInputHr = ref('');
        let addProductNameInputEn = ref('');
        let addProductNameInputDe = ref('');
        let addProductDescriptionInputHr = ref('');
        let addProductDescriptionInputEn = ref('');
        let addProductDescriptionInputDe = ref('');
        let addProductCodeInput = ref('');
        let addProductSexInput = ref(3);
        let addProductImageInput = ref();
        let addProductActiveInput = ref(true);
        let productStockConfirm = ref(false);
        let productAddSuccessMessage = ref('');
        let productAddErrorMessage = ref('');
        let productStockArray = ref([]);
        let productSizeOptions = ref(null);
        let productColorOptions = ref(null);

        const getColorOptions = () => {
            const API_URL = `colors`;
            httpService
                .get(API_URL)
                .then((response) => {
                    let colorOptionsObj = {};
                    response.data.map((color) => {
                        colorOptionsObj[color.id] = color;
                    });
                    productColorOptions.value = colorOptionsObj;

                    console.log('product color options 🔴🔵🟡');
                    console.log(productColorOptions.value);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const getSizeOptions = () => {
            const API_URL = `sizes`;
            httpService
                .get(API_URL)
                .then((response) => {
                    let sizeOptionsObj = {};
                    response.data.map((size) => {
                        sizeOptionsObj[size.id] = size;
                    });
                    productSizeOptions.value = sizeOptionsObj;

                    console.log('product size options 👣');
                    console.log(productSizeOptions.value);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const onInit = () => {
            getSizeOptions();
            getColorOptions();
        };

        let toggleproductStockConfirmation = () => {
            productStockConfirm.value = !productStockConfirm.value;
        };

        let attemptProductAdd = (event) => {
            const API_URL = `products`;

            let data = {
                name_hr: addProductNameInputHr.value,
                name_en: addProductNameInputEn.value,
                name_de: addProductNameInputDe.value,
                description_hr: addProductDescriptionInputHr.value,
                description_en: addProductDescriptionInputEn.value,
                description_de: addProductDescriptionInputDe.value,
                code: addProductCodeInput.value,
                sex: addProductSexInput.value,
                active: addProductActiveInput.value,
                image_name: addProductNameInputEn.value,
                image_path: addProductImageInput.value.name,
                category_id: parentCategoryId.value,
            };

            httpService
                .post(API_URL, data)
                .then((response) => {
                    console.log('Success!');
                    console.log(response.data);

                    if (!productStockArray.value.length) {
                        displaySuccessMessage();
                        resetFormValues();
                        context.emit('updateCategoriesProductList');
                    }

                    const productData = response.data;
                    updateStockData(productData);
                })
                .catch((error) => {
                    console.log(error);
                    displayErrorMessage();
                });
        };

        let updateStockData = (product) => {
            productStockArray.value.map(
                (stock) => (stock.product_id = product.id)
            );

            console.log('productStockArray.value');
            console.log(productStockArray.value);

            const API_URL = `product-stocks`;
            let data = {
                product_stocks: productStockArray.value,
                product_id: product.id,
            };

            httpService
                .post(API_URL, data)
                .then((response) => {
                    console.log('Success!');
                    console.log(response.data);

                    displaySuccessMessage();
                    resetFormValues();
                })
                .catch((error) => {
                    console.log(error);
                    displayErrorMessage();
                });
        };

        let resetFormValues = () => {
            addProductNameInputHr.value = '';
            addProductNameInputEn.value = '';
            addProductNameInputDe.value = '';
            addProductDescriptionInputHr.value = '';
            addProductDescriptionInputEn.value = '';
            addProductDescriptionInputDe.value = '';
            addProductCodeInput.value = '';
            addProductSexInput.value = 3;
            addProductImageInput.value = null;
            addProductActiveInput.value = true;
            productStockConfirm.value = false;
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
                    'You have successfully added a product!';
            }

            setTimeout(() => {
                productAddSuccessMessage.value = '';
            }, 1000 * 5);
        };

        let handleOnFocusOut = (event) => {
            if (!event.target.value) {
                displayErrorMessage('All fields are required!');
            }
        };

        let addToStockList = () => {
            let templateJson = {
                amount: 1,
                price: 1,
                size_id: 1,
                color_id: 2,
            };
            productStockArray.value.push(templateJson);
        };

        let deleteItemFromStockList = (index) => {
            productStockArray.value.splice(index, 1);
        };

        let handleImageInput = (event) => {
            const file = event.target.files[0];

            if (file.size / 1024 / 1024 > 10) {
                console.error('Nope. We no Jeff Bezos, we have to pay AWS.');
                return;
            }
            addProductImageInput.value = event.target.files[0];
        };

        onInit();

        return {
            parentCategoryId,
            addProductNameInputHr,
            addProductNameInputEn,
            addProductNameInputDe,
            addProductDescriptionInputHr,
            addProductDescriptionInputEn,
            addProductDescriptionInputDe,
            addProductCodeInput,
            addProductSexInput,
            addProductImageInput,
            addProductActiveInput,
            productStockConfirm,
            productAddSuccessMessage,
            productAddErrorMessage,
            productStockArray,
            productColorOptions,
            productSizeOptions,

            onInit,
            getSizeOptions,
            getColorOptions,
            toggleproductStockConfirmation,
            attemptProductAdd,
            updateStockData,
            resetFormValues,
            displayErrorMessage,
            displaySuccessMessage,
            handleOnFocusOut,
            addToStockList,
            deleteItemFromStockList,
            handleImageInput,

            httpService,
        };
    },
};
</script>

<style lang="scss">
#add-product {
    .product-data-inputs {
        @apply grid grid-cols-1 gap-2 my-2
            md:grid-cols-3 md:gap-6;

        &:not(:last-of-type) {
            @apply items-end;
        }

        &:last-of-type {
            .form-field:nth-last-of-type(2) {
                @apply md:order-last;
            }
        }

        input[type='text'],
        textarea {
            @apply w-full;

            &:focus {
                @apply outline-none shadow-sm border border-gray-500;
            }
        }

        input[type='radio'],
        input[type='checkbox'] {
            @apply mr-2;
        }

        .form-field {
            input:first-of-type,
            textarea {
                @apply mt-2 p-2;
            }
        }

        .custom-file-upload {
            @apply relative;

            input[type='file'] {
                position: relative;
                width: 1px;
                height: 1px;
                padding: 0;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                clip-path: inset(50%);
                border: 0;
            }

            > div {
                @apply relative;
            }

            > label {
                @apply relative py-3 px-4 top-3 cursor-pointer border-2 bg-gray-200 
                    border-gray-600 hover:bg-white hover:border-black dark:border-gray-300
                    dark:bg-gray-800 dark:hover:bg-gray-900 dark:hover:border-white;
            }
        }
    }

    .toggle-add-button {
        @apply w-full tracking-widest uppercase border py-2 border-gray-500 hover:bg-white
            hover:border-black dark:hover:bg-gray-700;
    }

    .add-stock {
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

    .confirm-buttons {
        @apply w-full grid grid-cols-1 gap-4
            md:grid-cols-2;

        button {
            @apply w-full my-2 py-2;
        }

        .add-product-button {
            @apply bg-green-300 hover:bg-green-400
            dark:bg-green-900 dark:hover:bg-green-800;
        }
        .add-product-cancel-button {
            @apply border-2 border-red-300 hover:border-red-500 hover:bg-red-50
            dark:border-red-900 dark:hover:border-red-500 dark:hover:bg-red-900;
        }
    }
}
</style>
