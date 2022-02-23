<template>
    <div class="edit-asset-main">
        <form @submit.prevent="attemptAssetEdit(asset)">
            <div class="edit-asset-inputs">
                <div class="form-field">
                    <label for="editAssetNameInputHr">Asset value</label>
                    <input
                        v-model.trim="editAssetNameInputHr"
                        id="editAssetNameInputHr"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Hrvatski"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editAssetNameInputEn"
                        id="editAssetNameInputEn"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="English"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editAssetNameInputDe"
                        id="editAssetNameInputDe"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Deutsch"
                    />
                </div>
            </div>

            <div class="edit-action-buttons">
                <button type="submit" class="button-edit">Edit</button>
                <button
                    @click.prevent="$emit('cancelAssetEdit')"
                    class="button-cancel"
                >
                    Cancel
                </button>
            </div>

            <div class="message">
                <div v-if="assetEditErrorMessage">
                    <Alert type="error" :message="assetEditErrorMessage" />
                </div>
                <div v-if="assetEditSuccessMessage">
                    <Alert type="success" :message="assetEditSuccessMessage" />
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import httpService from '@/components/http-service.vue';
import Alert from '@/components/Alert.vue';

export default {
    name: 'Edit Asset',

    components: {
        Alert,
    },

    props: {
        asset: Object,
    },

    setup(props) {
        let asset = ref(props.asset);
        let editAssetNameInputHr = ref(asset.value.hr);
        let editAssetNameInputEn = ref(asset.value.en);
        let editAssetNameInputDe = ref(asset.value.de);
        let assetEditErrorMessage = ref('');
        let assetEditSuccessMessage = ref('');

        let attemptAssetEdit = (asset) => {
            const API_URL = `lang-assets/asset/${asset.id}`;

            const data = {
                ...asset.value,
                name_hr: editAssetNameInputHr.value,
                name_en: editAssetNameInputEn.value,
                name_de: editAssetNameInputDe.value,
            };

            httpService
                .patch(API_URL, data)
                .then((response) => {
                    displaySuccessMessage();
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        let displayErrorMessage = (errorMessage?: string) => {
            if (errorMessage) {
                assetEditErrorMessage.value = errorMessage;
            } else {
                assetEditErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }

            setTimeout(() => {
                assetEditErrorMessage.value = '';
            }, 1000 * 5);
        };

        let displaySuccessMessage = (successMessage?: string) => {
            if (successMessage) {
                assetEditSuccessMessage.value = successMessage;
            } else {
                assetEditSuccessMessage.value =
                    'You have successfully edited this product!';
            }

            setTimeout(() => {
                assetEditSuccessMessage.value = '';
            }, 1000 * 5);
        };

        let handleOnFocusOut = (event) => {
            if (!event.target.value) {
                displayErrorMessage('All fields are required!');
            }
        };

        return {
            editAssetNameInputHr,
            editAssetNameInputEn,
            editAssetNameInputDe,
            assetEditErrorMessage,
            assetEditSuccessMessage,

            attemptAssetEdit,
            displayErrorMessage,
            displaySuccessMessage,
            handleOnFocusOut,

            httpService,
        };
    },
};
</script>

<style lang="scss">
.edit-asset-main {
    .edit-asset-inputs {
        @apply grid grid-cols-1 gap-2 my-2
            md:grid-cols-3 md:gap-6;

        &:not(:last-of-type) {
            @apply items-end;
        }

        input:first-of-type,
        textarea {
            @apply mt-2 p-2;
        }

        input[type='text'],
        textarea {
            @apply w-full;

            &:focus {
                @apply outline-none shadow-sm border border-gray-500;
            }
        }
    }

    .edit-action-buttons {
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
</style>
