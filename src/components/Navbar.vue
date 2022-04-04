<template>
    <div id="navbar">
        <nav role="navigation">
            <header>
                <div class="header-main">
                    <div class="header-start">
                        <div class="nav-brand">
                            <img
                                src="@/assets/images/company-logo.svg"
                                @click="routerService.routerLinkTo('/')"
                            />
                        </div>
                        <div class="nav-item">
                            <div
                                class="nav-link"
                                @click="
                                    routerService.routerLinkTo('/proizvodi')
                                "
                            >
                                Proizvodi
                            </div>
                        </div>
                        <div class="nav-item">
                            <div
                                class="nav-link"
                                @click="routerService.routerLinkTo('/o-nama')"
                            >
                                O nama
                            </div>
                        </div>
                        <div class="nav-item">
                            <div
                                class="nav-link"
                                @click="routerService.routerLinkTo('/kontakt')"
                            >
                                Kontakt
                            </div>
                        </div>
                    </div>

                    <div class="header-end">
                        <div class="nav-item" v-if="isUserLoggedIn">
                            <div @click="routerService.routerLinkTo('/b2b')">
                                b2b
                            </div>
                            <div v-if="getCartItemsCount">
                                <div
                                    class="cart-items-badge animate-ping"
                                ></div>
                                <div class="cart-items-badge">
                                    {{ getCartItemsCount }}
                                </div>
                            </div>
                        </div>

                        <div class="nav-item" v-if="isUserLoggedIn">
                            <div @click="attemptLogout()" class="logout">
                                Log out
                            </div>
                        </div>

                        <div class="nav-item">
                            <div @click="toggleLanguageSelect()">
                                {{ currentLang }}
                            </div>
                            <div
                                class="language-toggle"
                                :class="isLanguageSelectToggled && 'is-opened'"
                            >
                                <div
                                    v-for="(language, i) in ['en', 'hr', 'de']"
                                    :key="i"
                                >
                                    <div
                                        v-if="language !== currentLang"
                                        @click="selectLanguage(language)"
                                        class="language-select"
                                    >
                                        {{ language }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="theme-switch" @click="toggleColorTheme()">
                            <div v-if="isDarkMode == true">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/66/66275.png"
                                />
                            </div>
                            <div v-else>
                                <img src="@/assets/images/moon-icon.svg" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="header-mobile">
                    <div class="nav-brand">
                        <img
                            src="@/assets/images/company-logo.svg"
                            @click="routerService.routerLinkTo('/')"
                        />
                    </div>

                    <div
                        @click="toggleMobileMenu()"
                        class="hamburger"
                        :class="isMobileOpened && 'is-opened'"
                    >
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>

                    <div
                        class="mobile-nav-links"
                        :class="isMobileOpened && 'is-opened'"
                    >
                        <div @click="mobileLinkTo('/')" class="mobile-nav-link">
                            Naslovna
                        </div>
                        <div
                            @click="mobileLinkTo('/proizvodi')"
                            class="mobile-nav-link"
                        >
                            Proizvodi
                        </div>
                        <div
                            @click="mobileLinkTo('/o-nama')"
                            class="mobile-nav-link"
                        >
                            O nama
                        </div>
                        <div
                            @click="mobileLinkTo('/kontakt')"
                            class="mobile-nav-link"
                        >
                            Kontakt
                        </div>

                        <div
                            v-if="isUserLoggedIn"
                            class="mobile-links-separator"
                        ></div>

                        <div
                            v-if="isUserLoggedIn"
                            @click="mobileLinkTo('/b2b')"
                            class="mobile-nav-link"
                        >
                            B2b
                        </div>
                        <div
                            v-if="isUserLoggedIn"
                            @click="attemptLogout()"
                            class="mobile-nav-link"
                        >
                            Log out
                        </div>
                        <div @click="toggleColorTheme()" class="theme-switch">
                            <div v-if="isDarkMode == true">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/66/66275.png"
                                />
                            </div>
                            <div v-else>
                                <img src="@/assets/images/moon-icon.svg" />
                            </div>
                        </div>
                        <div class="language-mobile">
                            <div
                                v-for="(language, i) in ['en', 'hr', 'de']"
                                :key="i"
                            >
                                <div
                                    @click="
                                        language !== currentLang &&
                                            selectLanguage(language)
                                    "
                                    class="language-select"
                                    :class="
                                        language === currentLang &&
                                        'language-select-active'
                                    "
                                >
                                    {{ language.toUpperCase() }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </nav>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import userService from '@/services/user-service';
import routerService from '@/services/router-service';
import languageService from '@/services/language-service';
import cartStore from '@/store/cart';

export default {
    name: 'Navbar',

    setup() {
        const { getCartItemsCount } = cartStore;
        let isDarkMode = ref(localStorage.theme == 'dark' ? true : false);
        let isMobileOpened = ref(false);
        let currentLang = ref(languageService.getCurrentLang());
        let isLanguageSelectToggled = ref(false);
        let isUserLoggedIn = ref(userService.isUserLoggedIn());

        let toggleMobileMenu = () => {
            isMobileOpened.value = !isMobileOpened.value;
        };

        let mobileLinkTo = (route) => {
            isMobileOpened.value = false;
            routerService.routerLinkTo(route);
        };

        let attemptLogout = () => {
            try {
                userService.logout();
                isUserLoggedIn.value = false;
            } catch (error) {
                console.log(error);
            }
        };

        let toggleColorTheme = () => {
            if (localStorage.theme === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
                isDarkMode.value = true;
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
                isDarkMode.value = false;
            }
        };

        let toggleLanguageSelect = (order?: 'off' | 'on'): void => {
            if (order === 'off') {
                isLanguageSelectToggled.value = false;
                return;
            }

            if (order === 'on') {
                isLanguageSelectToggled.value = true;
                return;
            }

            isLanguageSelectToggled.value = !isLanguageSelectToggled.value;
        };

        let selectLanguage = (langCode) => {
            languageService.setCurrentLang(langCode);
            currentLang.value = langCode;
            toggleLanguageSelect('off');
            location.reload(); // krema 💦
        };

        return {
            getCartItemsCount,

            isDarkMode,
            isMobileOpened,
            currentLang,
            isLanguageSelectToggled,
            isUserLoggedIn,

            toggleMobileMenu,
            mobileLinkTo,
            toggleColorTheme,
            toggleLanguageSelect,
            selectLanguage,
            attemptLogout,

            userService,
            routerService,
        };
    },
};
</script>

<style lang="scss">
header {
    @apply w-full flex flex-row m-0;

    .theme-switch {
        @apply h-12 w-12 p-2 mr-2 rounded-3xl cursor-pointer;

        img {
            @apply h-full w-full;
        }
    }

    .nav-brand {
        @apply py-1 h-12 px-4 cursor-pointer;

        img {
            @apply w-full h-full;
        }
    }

    .header-main {
        @apply relative w-full hidden md:flex flex-row items-center justify-between text-lg
            lowercase bg-gray-100 py-2 text-gray-800
            dark:bg-gray-800 dark:text-gray-100;
        width: -moz-available;
        width: -webkit-fill-available;
        width: fill-available;
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);

        .nav-item {
            @apply relative py-2 px-4 cursor-pointer hover:text-red-400 dark:hover:text-red-800;

            .cart-items-badge {
                @apply absolute top-0 right-0 text-xs w-5 h-5 flex justify-center items-center
                    rounded-full bg-red-700 text-gray-100;
            }
        }

        .header-start {
            @apply flex flex-row items-center;
        }

        .header-end {
            @apply flex flex-row items-center;
        }

        .theme-switch {
            @apply bg-gray-800 dark:bg-gray-100
                hover:bg-red-400 dark:hover:bg-red-400;

            &:hover {
                @apply rounded-xl;
            }
        }

        .language-toggle {
            @apply absolute m-2 z-10 right-10 top-14 opacity-0 hidden text-gray-100;

            &.is-opened {
                @apply opacity-100 block;
            }

            .language-select {
                @apply py-2 px-6 cursor-pointer bg-gray-400 bg-opacity-50
                    hover:text-red-400 dark:hover:text-red-800
                    hover:bg-opacity-30 dark:hover:bg-opacity-80;
            }
        }
    }

    .header-mobile {
        @apply w-full flex md:hidden flex-row items-center justify-between z-40
            py-2
            bg-gray-100 py-2 text-gray-800
            dark:bg-gray-800 dark:text-gray-100;

        width: fill-available;
        width: -moz-available;
        width: -webkit-fill-available;
        padding-right: env(safe-area-inset-right);
        padding-left: env(safe-area-inset-left);

        .hamburger {
            @apply mx-3 flex flex-col z-50;

            .line {
                @apply w-6 h-0.5 bg-black m-1 rounded-sm 
                dark:bg-white;
            }

            &.is-opened {
                @apply right-0;
                position: fixed;
                -webkit-position: fixed;

                .line {
                    @apply bg-black dark:bg-white;

                    &:first-child {
                        transform: rotate(45deg) translate(0.5em, 0.8em);
                    }

                    &:nth-child(2) {
                        visibility: hidden;
                        transition: none;
                    }

                    &:last-child {
                        transform: rotate(-45deg) translate(0.1em, -0.35em);
                    }
                }
            }
        }

        .mobile-links-separator {
            @apply h-px my-2 w-1/12 bg-gray-500 bg-opacity-25 mx-auto;
        }

        .mobile-nav-links {
            @apply fixed w-full h-full top-0 left-0 flex flex-col justify-center
                items-center duration-300
                bg-gray-100 dark:bg-gray-800;

            clip-path: circle(0 at 92% 5%);
            -webkit-clip-path: circle(0 at 92% 5%);

            &.is-opened {
                @apply bg-gray-100 dark:bg-gray-800;
                clip-path: circle(120vh at 92% 5%);
                -webkit-clip-path: circle(120vh at 92% 5%);
            }

            .mobile-nav-link {
                @apply relative text-xl py-3 px-6 rounded-full text-gray-800
                    hover:bg-gray-400 dark:text-gray-100;
            }

            .theme-switch {
                @apply border-solid border-gray-100 border-2 m-5 bg-gray-700
                    dark:border-gray-800 dark:bg-gray-300;
            }

            .language-mobile {
                @apply flex justify-center text-lg gap-6;

                .language-select {
                    @apply text-gray-400 dark:text-gray-600 mt-4;
                }

                .language-select-active {
                    @apply text-gray-900 dark:text-gray-100;
                }
            }
        }
    }
}
</style>
