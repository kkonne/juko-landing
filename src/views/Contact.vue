<template>
    <div id="contact">
        <div class="contact-main">
            <div class="contact-form container-fluid">
                <form
                    class="contact-form-content container"
                    @submit.prevent="attemptContactFormSubmit()"
                >
                    <h1>Kontaktirajte nas</h1>

                    <p>Kako Vam možemo pomoći?</p>

                    <input
                        v-model="customerNameInput"
                        type="text"
                        placeholder="Ime"
                        @input="handleInputState($event)"
                        @blur="handleInputState($event)"
                        :class="!!customerNameInput.trim() && 'has-value'"
                    />
                    <br />
                    <input
                        v-model="customerEmailInput"
                        type="email"
                        placeholder="Email"
                        @input="handleInputState($event)"
                        @blur="handleInputState($event)"
                        :class="!!customerEmailInput.trim() && 'has-value'"
                    />
                    <br />
                    <input
                        v-model="customerSubjectInput"
                        type="text"
                        placeholder="Predmet"
                        @input="handleInputState($event)"
                        @blur="handleInputState($event)"
                        :class="!!customerSubjectInput.trim() && 'has-value'"
                    />
                    <br />
                    <textarea
                        v-model="customerMessageInput"
                        type="text"
                        placeholder="Vaše pitanje..."
                        rows="4"
                        @input="handleInputState($event)"
                        @blur="handleInputState($event)"
                        :class="!!customerMessageInput.trim() && 'has-value'"
                    />
                    <br />

                    <div class="message">
                        <div v-if="productAddErrorMessage">
                            <Alert
                                type="error"
                                :message="productAddErrorMessage"
                            />
                        </div>
                        <div v-if="productAddSuccessMessage">
                            <Alert
                                type="success"
                                :message="productAddSuccessMessage"
                            />
                        </div>
                    </div>

                    <button type="submit" class="contact-form-btn">Send</button>
                </form>
            </div>

            <div class="contact-alternatives container">
                <div
                    class="phone alternative-card"
                    v-motion-slide-visible-once-bottom
                >
                    <inline-svg
                        :src="require('@/assets/images/contact/phone-icon.svg')"
                        class="icon"
                    ></inline-svg>
                    <h2 class="title">Kontaktirajte nas</h2>
                    <div class="card-text">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Amet, eius.
                    </div>
                    <div class="featured-text">+387 63 123-456</div>
                </div>

                <div
                    class="address alternative-card"
                    v-motion-slide-visible-once-bottom
                >
                    <inline-svg
                        :src="
                            require('@/assets/images/contact/location-icon.svg')
                        "
                        class="icon"
                    ></inline-svg>
                    <h2 class="title">Posjetite nas</h2>
                    <div class="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quod, praesentium!
                    </div>
                    <div class="featured-text">
                        Ante Brune Bušića 35, Posušje
                    </div>
                </div>
            </div>

            <div class="location container">
                <h3 class="label">Gdje se nalazimo:</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2895.712724313696!2d17.32552961548316!3d43.46659437249524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134b2783ec220737%3A0x63b0dd9a8d0de0b4!2sJUKO%20d.o.o.!5e0!3m2!1sen!2sba!4v1664120328367!5m2!1sen!2sba"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    class="map"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import Alert from '@/components/Alert.vue';

export default {
    name: 'Kontakt',

    components: {
        Alert,
    },

    setup() {
        let productAddSuccessMessage = ref(null);
        let productAddErrorMessage = ref(null);
        let customerNameInput = ref('');
        let customerEmailInput = ref('');
        let customerSubjectInput = ref('');
        let customerMessageInput = ref('');

        const attemptContactFormSubmit = (): void => {
            console.log('Submitted contact form :)');

            if (
                !customerNameInput.value.trim() ||
                !customerEmailInput.value.trim() ||
                !customerSubjectInput.value.trim() ||
                !customerMessageInput.value.trim()
            ) {
                const errorMessage =
                    'All fields are required! Please fill out all fields.';
                displayErrorMessage(errorMessage);
            }
        };

        const displayErrorMessage = (errorMessage?: string): void => {
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

        const displaySuccessMessage = (successMessage?: string): void => {
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

        const handleInputState = (event) => {
            if (!event.currentTarget.value.trim()) {
                event.currentTarget.classList.add('faulty');
            } else {
                event.currentTarget.classList.remove('faulty');
            }
        };

        return {
            productAddSuccessMessage,
            productAddErrorMessage,
            customerNameInput,
            customerEmailInput,
            customerSubjectInput,
            customerMessageInput,

            attemptContactFormSubmit,
            displayErrorMessage,
            displaySuccessMessage,
            handleInputState,
        };
    },
};
</script>

<style lang="scss" scoped>
.contact-main {
    .contact-form {
        @apply text-gray-700 flex items-center justify-center relative;

        min-height: calc(100vh - 64px - env(safe-area-inset-bottom));
        background-image: url('https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        &::after {
            @apply absolute w-full top-0 h-full left-0 bg-gradient-to-t from-gray-200 dark:from-gray-900;
            content: '';
        }

        .contact-form-content {
            @apply text-center z-10;

            h1 {
                @apply font-bold my-4;
            }

            p {
                @apply md:mx-32 my-2;
            }

            input,
            textarea {
                @apply w-full my-2 p-2 border border-gray-700 rounded-lg 
                placeholder-gray-700 outline-none resize-none text-gray-800
                md:w-1/2
                2xl:w-1/3
                focus:bg-gray-200 focus:shadow-lg;

                background-color: #f1f1f180;

                &.faulty {
                    @apply border-red-500 border-opacity-100 bg-red-300 bg-opacity-80
                    focus:border-opacity-50 focus:bg-opacity-40;
                }

                &.has-value {
                    @apply bg-gray-200;
                }
            }

            .message {
                @apply w-full mx-auto md:w-1/2 2xl:w-1/3;
            }

            .contact-form-btn {
                @apply w-full p-2 my-2 bg-gray-900 rounded-lg text-gray-300 outline-none
                    transform md:w-1/2 2xl:w-1/3
                    focus:shadow-lg focus:text-gray-100
                    hover:-translate-y-2 focus:-translate-y-2
                    hover:bg-gray-800 focus:bg-gray-800;
            }
        }
    }

    .contact-alternatives {
        @apply grid grid-cols-1 gap-16 my-24
            md:grid-cols-2 md:gap-24;

        .alternative-card {
            @apply text-center grid justify-center px-6 py-8 rounded-3xl border 
                border-opacity-30 border-red-500 bg-gray-500 bg-opacity-10 transform-gpu
                hover:-translate-y-2 hover:shadow-lg;

            .icon {
                @apply h-16 w-16 mx-auto mb-4;

                svg {
                    @apply h-full w-full;
                }
            }

            .title {
                @apply text-2xl font-bold tracking-wider;
            }

            .card-text {
                @apply text-gray-600 dark:text-gray-400;

                max-width: 45ch;
            }

            .featured-text {
                @apply text-lg tracking-wider my-3 uppercase;
            }
        }
    }

    .location {
        @apply my-8;

        .label {
            @apply text-center mb-4;
        }

        .map {
            @apply w-full h-48 md:h-96 border border-gray-900;
        }
    }
}
</style>
