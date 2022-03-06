<template>
    <div id="login" class="login-main">
        <div class="login-card">
            <form @submit.prevent="attemptLogin()">
                <div class="login-title">
                    <h1>Log in</h1>
                </div>
                <div class="login-body">
                    <div class="login-content">
                        <div class="input-field">
                            <label
                                :class="loginEmailInput && 'show'"
                                for="email"
                                class="input-label"
                                >E-mail</label
                            >
                            <input
                                v-model.trim="loginEmailInput"
                                id="email"
                                type="email"
                                placeholder="E-mail"
                                @blur="handleOnBlur($event)"
                                @input="handleInputState($event)"
                            />
                        </div>

                        <div class="input-field">
                            <label
                                :class="loginPasswordInput && 'show'"
                                for="password"
                                class="input-label"
                                >Password</label
                            >
                            <input
                                v-model.trim="loginPasswordInput"
                                id="password"
                                type="password"
                                placeholder="Password"
                            />
                        </div>

                        <div class="message">
                            <div v-if="loginErrorMessage">
                                <Alert
                                    type="error"
                                    :message="loginErrorMessage"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button type="submit" class="login-button">
                            Log in
                        </button>
                    </div>
                </div>
                <div
                    @click="routerService.routerLinkTo('/')"
                    class="login-link"
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
    name: 'login',

    components: {
        Alert,
    },

    setup() {
        let loginEmailInput = ref('');
        let loginPasswordInput = ref('');
        let loginErrorMessage = ref('');

        let onInit = () => {
            if (userService.isUserLoggedIn()) {
                routerService.routerLinkTo('/');
            }
        };

        let attemptLogin = async () => {
            if (!loginEmailInput.value || !loginPasswordInput.value) {
                displayErrorMessage('All fields required!');
                return;
            }

            const data = {
                email: loginEmailInput.value,
                password: loginPasswordInput.value,
            };

            try {
                const response = await userService.login(data);
                userService.setUserToken(response.data.token);
                authStore.setUser(response.data.user);
                handleAfterLoginRedirect();
            } catch (error) {
                console.log(error);
                displayErrorMessage();
            }
        };

        const handleInputState = (event): void => {
            if (!event.currentTarget.value) {
                event.currentTarget.classList.add('faulty');
            } else {
                event.currentTarget.classList.remove('faulty');
            }
        };

        const handleOnBlur = (event): void => {
            if (!event.currentTarget.value) {
                displayErrorMessage('All fields required!');
            }
        };

        const displayErrorMessage = (errorMessage?: string): void => {
            if (errorMessage) {
                loginErrorMessage.value = errorMessage;
            } else {
                loginErrorMessage.value =
                    'An error occurred! Please check your input or try again later.';
            }

            setTimeout(() => {
                loginErrorMessage.value = '';
            }, 1000 * 5);
        };

        const handleAfterLoginRedirect = (): void => {
            const afterLoginRedirectUrl = routerService.getAfterLoginUrl();
            if (afterLoginRedirectUrl) {
                routerService.routerLinkTo(afterLoginRedirectUrl);
            } else {
                routerService.routerLinkTo('/');
            }
        };

        onInit();

        return {
            loginEmailInput,
            loginPasswordInput,
            loginErrorMessage,

            onInit,
            handleInputState,
            handleOnBlur,
            attemptLogin,
            handleAfterLoginRedirect,

            routerService,
            httpService,
            generalService,
            userService,
        };
    },
};
</script>

<style lang="scss">
.login-main {
    @apply w-screen min-h-screen flex justify-center items-center;
    .login-card {
        @apply w-64 md:w-2/5;

        .login-title {
            @apply text-center mb-6;
        }

        .login-body {
            @apply w-full bg-white text-gray-900 px-4 py-10 flex flex-col gap-6 items-center
                md:px-8;

            input {
                @apply bg-white text-gray-900;
            }

            .login-content {
                @apply w-full;

                .input-field {
                    @apply relative my-6;

                    .input-label {
                        @apply absolute -top-2 text-sm left-6 bg-white px-2 leading-none text-red-400 opacity-0;

                        &.show {
                            @apply opacity-100 duration-300;
                        }
                    }

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

                .login-button {
                    @apply bg-red-100 border-red-400
                        hover:bg-red-300 hover:border-red-500
                        focus:bg-red-300 focus:border-red-500;
                }
            }
        }

        .login-link {
            @apply mt-6 flex justify-center hover:underline cursor-pointer;
        }
    }
}
</style>
