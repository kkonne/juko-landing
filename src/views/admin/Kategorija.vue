<template>
    <div id="admin-category">
        <div class="admin-category-main container">
            <div class="breadcrumb">
                <span @click="routerService.routerLinkTo('/admin')">Admin</span>
                /
                <span class="active">Category</span>
            </div>

            <h1 class="headline">Categories</h1>

            <p class="subtitle">You can edit category categories here</p>

            <button
                @click="toggleAddCategory()"
                class="toggle-add-category-button"
            >
                <span>Add category</span>
                <div class="icon" :class="isAddCategoryToggled && 'toggled'">
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

            <div v-if="isAddCategoryToggled" class="add-category">
                <form @submit.prevent="attemptCategoryAdd()">
                    <div class="add-category-inputs">
                        <div class="form-field">
                            <label for="categoryNameInputHr"
                                >Category name</label
                            >
                            <input
                                v-model.trim="addCategoryNameInputHr"
                                id="categoryNameInputHr"
                                type="text"
                                @blur="handleOnFocusOut($event)"
                                placeholder="Hrvatski"
                            />
                        </div>

                        <div class="form-field">
                            <input
                                v-model.trim="addCategoryNameInputEn"
                                id="categoryNameInputEn"
                                type="text"
                                @blur="handleOnFocusOut($event)"
                                placeholder="English"
                            />
                        </div>

                        <div class="form-field">
                            <input
                                v-model.trim="addCategoryNameInputDe"
                                id="categoryNameInputDe"
                                type="text"
                                @blur="handleOnFocusOut($event)"
                                placeholder="Deutsch"
                            />
                        </div>
                    </div>

                    <div class="end-actions">
                        <select
                            v-model="parentCategoryId"
                            name="parent-category"
                            id="parent-category"
                            class="parent-category-select"
                            @blur="handleOnFocusOut($event)"
                        >
                            <option hidden disabled>
                                Choose parent category
                            </option>
                            <option value="">None</option>
                            <option
                                v-for="(category, i) in categoriesList"
                                :key="i"
                                :value="category.id"
                            >
                                {{ category.name_en }}
                            </option>
                        </select>

                        <button type="submit" class="category-add-button">
                            Add
                        </button>
                    </div>

                    <div class="message">
                        <div v-if="categoryAddErrorMessage">
                            <Alert
                                type="error"
                                :message="categoryAddErrorMessage"
                            />
                        </div>
                        <div v-if="categoryAddSuccessMessage">
                            <Alert
                                type="success"
                                :message="categoryAddSuccessMessage"
                            />
                        </div>
                    </div>
                </form>
            </div>

            <div v-if="categoriesList" class="categories-list">
                <div
                    v-for="(category, i) in categoriesList"
                    :key="i"
                    class="category-item"
                >
                    <div class="category-main">
                        <div class="category-id">
                            <div class="category-name">
                                {{ category.category_name }}
                            </div>
                        </div>

                        <div
                            v-if="
                                !category.isEditCategoryToggled &&
                                !category.isDeleteCategoryToggled
                            "
                            class="category-actions"
                        >
                            <button
                                @click="toggleCategoryEdit(category)"
                                class="category-edit-toggle"
                            >
                                Edit
                            </button>
                            <button
                                @click="toggleCategoryDelete(category)"
                                class="category-delete-toggle"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <div v-if="category.isEditCategoryToggled">
                        <EditCategory
                            :category="category"
                            @cancel-category-edit="toggleCategoryEdit(category)"
                        />
                    </div>
                    <div
                        v-if="category.isDeleteCategoryToggled"
                        class="category-delete-confirm"
                    >
                        <button
                            @click="
                                attemptCategoryDelete(category.category_slug, i)
                            "
                            class="category-delete-button"
                        >
                            Delete
                        </button>
                        <button
                            @click="toggleCategoryDelete(category)"
                            class="category-delete-cancel"
                        >
                            Cancel
                        </button>
                    </div>

                    <div
                        v-if="category.children_categories.length"
                        class="child-categories"
                    >
                        <div
                            v-for="(
                                childCategory, i
                            ) in category.children_categories"
                            :key="-i"
                            class="child-categories-item"
                        >
                            <div class="child-categories-item-main">
                                <div class="category-name">
                                    {{ childCategory.category_name }}
                                </div>

                                <div
                                    v-if="
                                        !childCategory.isEditCategoryToggled &&
                                        !childCategory.isDeleteCategoryToggled
                                    "
                                    class="category-actions"
                                >
                                    <button
                                        @click="
                                            toggleCategoryEdit(childCategory)
                                        "
                                        class="category-edit-toggle"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        @click="
                                            toggleCategoryDelete(childCategory)
                                        "
                                        class="category-delete-toggle"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            <div v-if="childCategory.isEditCategoryToggled">
                                <EditCategory
                                    :category="childCategory"
                                    @cancel-category-edit="
                                        toggleCategoryEdit(childCategory)
                                    "
                                />
                            </div>
                            <div
                                v-if="childCategory.isDeleteCategoryToggled"
                                class="category-delete-confirm"
                            >
                                <button
                                    @click="
                                        attemptCategoryDelete(
                                            childCategory.category_slug,
                                            i
                                        )
                                    "
                                    class="category-delete-button"
                                >
                                    Delete
                                </button>
                                <button
                                    @click="toggleCategoryDelete(childCategory)"
                                    class="category-delete-cancel"
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
import httpService from '@/services/http-service';
import EditCategory from '@/components/admin/EditCategory.vue';
import Alert from '@/components/Alert.vue';

export default {
    name: 'Admin Kategorija',

    components: {
        EditCategory,
        Alert,
    },

    setup() {
        let categoriesList = ref([]);
        let isAddCategoryToggled = ref(false);
        let addCategoryNameInputHr = ref('');
        let addCategoryNameInputEn = ref('');
        let addCategoryNameInputDe = ref('');
        let categoryAddErrorMessage = ref('');
        let categoryAddSuccessMessage = ref('');
        let parentCategoryId = ref('-');
        let isEditCategoryToggled = ref(false);
        let isDeleteCategoryToggled = ref(false);

        let onInit = (): void => {
            const API_URL = 'categories';
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

        let handleOnFocusOut = (event): void => {
            if (!event.target.value) {
                displayErrorMessage('All fields are required!');
            }
        };

        let displayErrorMessage = (errorMessage?: string): void => {
            if (errorMessage) {
                categoryAddErrorMessage.value = errorMessage;
            } else {
                categoryAddErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }
            setTimeout(() => {
                categoryAddErrorMessage.value = '';
            }, 1000 * 5);
        };

        let displaySuccessMessage = (successMessage?: string): void => {
            if (successMessage) {
                categoryAddSuccessMessage.value = successMessage;
            } else {
                categoryAddSuccessMessage.value =
                    'You have successfully added a category!';
            }

            setTimeout(() => {
                categoryAddSuccessMessage.value = '';
            }, 1000 * 5);
        };

        let toggleAddCategory = () => {
            isAddCategoryToggled.value = !isAddCategoryToggled.value;
        };

        let attemptCategoryAdd = () => {
            let data = {
                name_hr: addCategoryNameInputHr.value,
                name_en: addCategoryNameInputEn.value,
                name_de: addCategoryNameInputDe.value,
                parent_id: parentCategoryId.value,
                image_path:
                    'https://kkonne.github.io/graphic-portfolio/images/portrait-sketch.png',
            };

            const API_URL = 'categories';
            httpService
                .post(API_URL, data)
                .then((response) => {
                    onInit();
                    displaySuccessMessage();
                    resetFormValues();
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        let resetFormValues = () => {
            addCategoryNameInputHr.value = '';
            addCategoryNameInputEn.value = '';
            addCategoryNameInputDe.value = '';
            parentCategoryId.value = '-';
        };

        let toggleCategoryEdit = (category) => {
            category.isEditCategoryToggled = !category.isEditCategoryToggled;
        };

        let toggleCategoryDelete = (category) => {
            category.isDeleteCategoryToggled =
                !category.isDeleteCategoryToggled;
        };

        let attemptCategoryDelete = (categorySlug, index) => {
            const API_URL = `categories/${categorySlug}`;
            httpService
                .get(API_URL)
                .then((response) => {
                    categoriesList.value.splice(index, 1);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        onInit();

        return {
            categoriesList,
            isAddCategoryToggled,
            addCategoryNameInputHr,
            addCategoryNameInputEn,
            addCategoryNameInputDe,
            categoryAddErrorMessage,
            categoryAddSuccessMessage,
            parentCategoryId,
            isEditCategoryToggled,
            isDeleteCategoryToggled,

            onInit,
            handleOnFocusOut,
            displayErrorMessage,
            displaySuccessMessage,
            toggleAddCategory,
            attemptCategoryAdd,
            resetFormValues,
            toggleCategoryEdit,
            toggleCategoryDelete,
            attemptCategoryDelete,

            routerService,
        };
    },
};
</script>

<style lang="scss">
.admin-category-main {
    @apply my-10;

    .toggle-add-category-button {
        @apply py-4 mt-6 mb-2 px-6 w-max flex flex-row items-center justify-center border
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

    .add-category {
        @apply my-6;

        .add-category-inputs {
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

        .end-actions {
            @apply grid grid-cols-1 gap-2
                md:grid-cols-4 md:gap-6;

            .parent-category-select {
                @apply w-full my-2 py-2
                    md:col-span-1;
            }

            .category-add-button {
                @apply w-full tracking-widest uppercase border my-2 py-2 border-gray-500 hover:bg-white
                hover:border-black dark:hover:bg-gray-700 md:col-span-3;
            }
        }
    }

    .categories-list {
        .category-item {
            @apply my-4 px-4 p-2 bg-red-500 bg-opacity-10
                hover:shadow-lg;

            .category-main {
                @apply flex flex-col justify-center items-start 
                    md:flex-row md:items-center md:justify-between;

                .category-id {
                    @apply flex flex-col my-2
                        md:my-0;

                    .category-name {
                        @apply text-lg tracking-wide;
                    }

                    .category-code {
                        @apply text-xs uppercase text-gray-600
                            dark:text-gray-300;
                    }
                }
            }

            .child-categories {
                @apply my-4;

                .child-categories-item {
                    @apply py-2 px-4 my-4 bg-gray-500 bg-opacity-20;

                    .child-categories-item-main {
                        @apply flex flex-col justify-center items-start 
                            md:flex-row md:items-center md:justify-between;
                    }
                }
            }
        }

        .category-delete-confirm {
            @apply flex flex-row gap-2;

            button {
                @apply px-4 py-2 my-2 w-full;
            }

            .category-delete-button {
                @apply bg-red-400 hover:bg-red-500
                    dark:bg-red-800 dark:hover:bg-red-600;
            }
            .category-delete-cancel {
                @apply border border-gray-500 hover:bg-gray-500;
            }
        }

        .category-actions {
            @apply flex flex-row gap-2;

            button {
                @apply px-4 py-2 border;
            }

            .category-edit-toggle {
                @apply border-blue-400 hover:bg-blue-400
                            dark:border-blue-900 dark:hover:bg-blue-900;
            }

            .category-delete-toggle {
                @apply border-red-400 hover:bg-red-400
                            dark:border-red-800 dark:hover:bg-red-800;
            }
        }
    }
}
</style>
