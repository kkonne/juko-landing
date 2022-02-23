<template>
    <div class="edit-category-main">
        <form @submit.prevent="attemptCategoryEdit(category)">
            <div class="edit-category-inputs">
                <div class="form-field">
                    <label for="editCategoryNameInputHr">Category name</label>
                    <input
                        v-model.trim="editCategoryNameInputHr"
                        id="editCategoryNameInputHr"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Hrvatski"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editCategoryNameInputEn"
                        id="editCategoryNameInputEn"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="English"
                    />
                </div>

                <div class="form-field">
                    <input
                        v-model.trim="editCategoryNameInputDe"
                        id="editCategoryNameInputDe"
                        type="text"
                        @blur="handleOnFocusOut($event)"
                        placeholder="Deutsch"
                    />
                </div>
            </div>

            <div class="edit-action-buttons">
                <button type="submit" class="button-edit">Edit</button>
                <button
                    @click.prevent="$emit('cancelCategoryEdit')"
                    class="button-cancel"
                >
                    Cancel
                </button>
            </div>

            <div class="message">
                <div v-if="categoryEditErrorMessage">
                    <Alert type="error" :message="categoryEditErrorMessage" />
                </div>
                <div v-if="categoryEditSuccessMessage">
                    <Alert type="success" :message="categoryEditSuccessMessage" />
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
    name: 'Edit Category',

    components: {
        Alert,
    },

    props: {
        category: Object,
    },

    setup(props) {
        let category = ref(props.category);
        let editCategoryNameInputHr = ref(category.value.name_hr);
        let editCategoryNameInputEn = ref(category.value.name_en);
        let editCategoryNameInputDe = ref(category.value.name_de);
        let categoryEditErrorMessage = ref('');
        let categoryEditSuccessMessage = ref('');

        let attemptCategoryEdit = (category) => {
            const API_URL = `categories/${category.category_slug}`;

            const data = {
                ...category.value,
                name_hr: editCategoryNameInputHr.value,
                name_en: editCategoryNameInputEn.value,
                name_de: editCategoryNameInputDe.value,
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
                categoryEditErrorMessage.value = errorMessage;
            } else {
                categoryEditErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }

            setTimeout(() => {
                categoryEditErrorMessage.value = '';
            }, 1000 * 5);
        };

        let displaySuccessMessage = (successMessage?: string) => {
            if (successMessage) {
                categoryEditSuccessMessage.value = successMessage;
            } else {
                categoryEditSuccessMessage.value =
                    'You have successfully edited this product!';
            }

            setTimeout(() => {
                categoryEditSuccessMessage.value = '';
            }, 1000 * 5);
        };

        let handleOnFocusOut = (event) => {
            if (!event.target.value) {
                displayErrorMessage('All fields are required!');
            }
        };

        return {
            editCategoryNameInputHr,
            editCategoryNameInputEn,
            editCategoryNameInputDe,
            categoryEditErrorMessage,
            categoryEditSuccessMessage,

            attemptCategoryEdit,
            displayErrorMessage,
            displaySuccessMessage,
            handleOnFocusOut,

            httpService,
        };
    },
};
</script>

<style lang="scss">
.edit-category-main {
    .edit-category-inputs {
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
