<template>
    <div id="register" class="register-main">
        <div class="register-card">
            <form>
                <div class="register-title">
                    <h1>Register at Juko</h1>
                </div>
                <div class="register-body">
                    <div class="stepper">
                        <progress
                            id="form-step"
                            :value="steps[selectedStep].progress"
                            max="100"
                        ></progress>
                    </div>

                    <div class="register-content">
                        <div v-if="selectedStep === 0">
                            <h4 class="step-title subtitle">Account details</h4>

                            <div class="input-field">
                                <label
                                    :class="registerEmailInput && 'show'"
                                    for="email"
                                    class="input-label"
                                    >E-mail</label
                                >
                                <input
                                    v-model.trim="registerEmailInput"
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    @blur="handleOnBlur($event)"
                                    @input="handleInputState($event)"
                                />
                            </div>

                            <div class="input-field">
                                <label
                                    :class="registerCompanyInput && 'show'"
                                    for="company"
                                    class="input-label"
                                    >Company name</label
                                >
                                <input
                                    v-model.trim="registerCompanyInput"
                                    id="company"
                                    type="text"
                                    placeholder="Company name"
                                    @blur="handleOnBlur($event)"
                                    @input="handleInputState($event)"
                                />
                            </div>
                        </div>

                        <div v-if="selectedStep === 1">
                            <h4 class="step-title subtitle">
                                Security and privacy
                            </h4>

                            <div class="input-field">
                                <label
                                    :class="registerPasswordInput && 'show'"
                                    for="password"
                                    class="input-label"
                                    >Password</label
                                >
                                <input
                                    v-model.trim="registerPasswordInput"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>

                            <div class="input-field">
                                <label
                                    :class="
                                        registerConfirmPasswordInput && 'show'
                                    "
                                    for="confirm-password"
                                    class="input-label"
                                    >Confirm password</label
                                >
                                <input
                                    v-model.trim="registerConfirmPasswordInput"
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>

                        <div v-if="selectedStep === 2">
                            <img
                                src="https://diamedicalusa.com/wp-content/uploads/2021/08/Icon-ionic-ios-checkmark-circle-outline.png"
                                alt="Success checkmark"
                                class="w-1/2 my-2 mx-auto"
                            />

                            Success! Your account has been registered, you will
                            receive a message in mail soon!
                        </div>

                        <div class="message">
                            <div v-if="registerErrorMessage">
                                <Alert
                                    type="error"
                                    :message="registerErrorMessage"
                                />
                            </div>
                            <div v-if="registerSuccessMessage">
                                <Alert
                                    type="success"
                                    :message="registerSuccessMessage"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button
                            @click.prevent="backToPreviousStep()"
                            v-if="selectedStep !== 0 && selectedStep !== 2"
                            class="back-button"
                        >
                            Back
                        </button>
                        <button
                            @click.prevent="goToNextStep()"
                            v-if="selectedStep !== 2"
                            class="next-button"
                        >
                            Next
                        </button>
                        <button
                            @click.prevent="routerService.routerLinkTo('/')"
                            v-if="selectedStep === 2"
                            class="next-button"
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div
                    v-if="selectedStep !== 2"
                    @click="routerService.routerLinkTo('/')"
                    class="register-link"
                >
                    Back to homepage
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import authStore from '@/store/auth';
import routerService from '@/services/router-service';
import httpService from '@/services/http-service';
import generalService from '@/services/general-service';
import userService from '@/services/user-service';
import Alert from '@/components/Alert.vue';

export default {
    name: 'Register',

    components: {
        Alert,
    },

    setup() {
        let selectedStep = ref(0);
        let steps = [{ progress: 15 }, { progress: 50 }, { progress: 100 }];
        let registerEmailInput = ref('');
        let registerPasswordInput = ref('');
        let registerConfirmPasswordInput = ref('');
        let registerCompanyInput = ref('');
        let registerErrorMessage = ref('');
        let registerSuccessMessage = ref('');

        let onInit = () => {
            if (userService.isUserLoggedIn()) {
                routerService.routerLinkTo('/');
            }
        };

        let backToPreviousStep = () => {
            if (selectedStep.value < 1) {
                return;
            }
            selectedStep.value--;
        };

        let goToNextStep = () => {
            if (selectedStep.value > 1) {
                return;
            }

            if (selectedStep.value === 0) {
                if (!registerEmailInput.value || !registerCompanyInput.value) {
                    displayErrorMessage('All fields required!');
                    return;
                }

                const isEmailValid = generalService.isValidMail(
                    registerEmailInput.value
                );
                if (!isEmailValid) {
                    displayErrorMessage('Invalid email format!');
                    return;
                }

                selectedStep.value++;
                return;
            }

            if (selectedStep.value === 1) {
                if (
                    !registerPasswordInput.value ||
                    !registerConfirmPasswordInput.value
                ) {
                    displayErrorMessage('All fields required!');
                    return;
                }

                if (registerPasswordInput.value.length < 8) {
                    displayErrorMessage(
                        'Password must have at least 8 characters!'
                    );
                    return;
                }

                if (
                    registerPasswordInput.value !==
                    registerConfirmPasswordInput.value
                ) {
                    displayErrorMessage('Passwords must match!');
                    return;
                }

                const data = {
                    name: registerCompanyInput.value,
                    email: registerEmailInput.value,
                    password: registerPasswordInput.value,
                    password_confirmation: registerConfirmPasswordInput.value,
                };

                const API_URL = 'register';
                httpService
                    .post(API_URL, data)
                    .then((response) => {
                        userService.setUserToken(response.data.token);
                        authStore.setUser(response.data.user);
                        selectedStep.value++;
                    })
                    .catch((error) => {
                        console.log(error);
                        displayErrorMessage();
                    });
            }
        };

        let handleInputState = (event) => {
            if (!event.currentTarget.value) {
                event.currentTarget.classList.add('faulty');
            } else {
                event.currentTarget.classList.remove('faulty');
            }
        };

        let handleOnBlur = (event) => {
            if (!event.currentTarget.value) {
                displayErrorMessage('All fields required!');
            }
        };

        let displayErrorMessage = (errorMessage?: string) => {
            if (errorMessage) {
                registerErrorMessage.value = errorMessage;
            } else {
                registerErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }

            setTimeout(() => {
                registerErrorMessage.value = '';
            }, 1000 * 5);
        };

        let displaySuccessMessage = (successMessage?: string) => {
            if (successMessage) {
                registerSuccessMessage.value = successMessage;
            } else {
                registerSuccessMessage.value =
                    'You have successfully registered!';
            }

            setTimeout(() => {
                registerSuccessMessage.value = '';
            }, 1000 * 5);
        };

        onInit();

        return {
            selectedStep,
            steps,
            registerEmailInput,
            registerPasswordInput,
            registerConfirmPasswordInput,
            registerCompanyInput,
            registerErrorMessage,
            registerSuccessMessage,

            onInit,
            goToNextStep,
            backToPreviousStep,
            handleInputState,
            handleOnBlur,
            displayErrorMessage,
            displaySuccessMessage,

            routerService,
            httpService,
            generalService,
            userService,
        };
    },
};
</script>

<style lang="scss">
.register-main {
    @apply w-screen min-h-screen flex justify-center items-center;
    .register-card {
        @apply w-64 md:w-2/5;

        .register-title {
            @apply text-center mb-6;
        }

        .register-body {
            @apply w-full bg-white text-gray-900 px-4 py-10 flex flex-col gap-6 items-center
                md:px-8;

            input {
                @apply bg-white text-gray-900;
            }

            .stepper {
                @apply w-full;

                progress {
                    @apply w-full my-2 text-red-500;

                    &[value] {
                        @apply appearance-none;

                        &::-webkit-progress-bar {
                            @apply bg-gray-500 bg-opacity-25;
                        }

                        &::-webkit-progress-value {
                            @apply bg-red-400;
                        }
                    }
                }
            }

            .register-content {
                @apply w-full;

                .step-title {
                    @apply mb-4;
                }

                .input-field {
                    @apply relative my-6;

                    .input-label {
                        @apply absolute -top-2 text-sm left-6 bg-white px-2 leading-none text-red-400 opacity-0;

                        &.show {
                            @apply opacity-100 duration-300;
                        }
                    }

                    input[type='text'],
                    input[type='email'],
                    input[type='password'] {
                        @apply w-full py-2 px-2 border border-gray-300 outline-none
                         focus:border-red-400
                         hover:border-red-200 hover:shadow-md;

                        &.faulty {
                            @apply border-red-200 bg-red-50;
                        }
                    }
                }
            }

            .action-buttons {
                @apply flex gap-4;

                button {
                    @apply py-2 px-4 border-2 outline-none
                        focus:shadow-sm;
                }

                .next-button {
                    @apply bg-red-100 border-red-400
                        hover:bg-red-300 hover:border-red-500
                        focus:bg-red-300 focus:border-red-500;
                }

                .back-button {
                    @apply bg-gray-100 border-gray-400
                        hover:bg-gray-300 hover:border-gray-500
                        focus:bg-gray-300 focus:border-gray-500;
                }
            }
        }

        .register-link {
            @apply mt-6 flex justify-center hover:underline cursor-pointer;
        }
    }
}
</style>
