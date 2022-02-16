<template>
    <div id="footer">
        <footer role="navigation" aria-roledescription="navigation">
            <div class="footer">
                <div class="dark-divider"></div>
                <div class="container">
                    <div class="footer-main">
                        <div class="footer-brand">
                            <img
                                src="@/assets/images/company-logo.svg"
                                alt="Juko company logo"
                                class="footer-logo"
                            />
                            <h5 class="footer-title">Juko</h5>
                        </div>

                        <div class="footer-nav">
                            <div
                                @click="routerService.routerLinkTo('/')"
                                class="footer-link"
                            >
                                Naslovna
                            </div>
                            <div
                                @click="
                                    routerService.routerLinkTo('/proizvodi')
                                "
                                class="footer-link"
                            >
                                Proizvodi
                            </div>
                            <div
                                @click="routerService.routerLinkTo('/partneri')"
                                class="footer-link"
                            >
                                Partneri
                            </div>
                            <div
                                @click="routerService.routerLinkTo('/o-nama')"
                                class="footer-link"
                            >
                                O nama
                            </div>
                            <div
                                @click="routerService.routerLinkTo('/kontakt')"
                                class="footer-link"
                            >
                                Kontakt
                            </div>
                        </div>
                    </div>

                    <div class="footer-other">
                        <div class="helpful-links">
                            <div class="other-link">Privatnost</div>
                            <div class="other-link">Kolačići</div>
                            <div class="other-link">B2B</div>
                            <div @click="routerService.routerLinkTo('/admin')"
                            class="other-link">Admin</div>
                        </div>
                        <div class="social-media">
                            <div class="other-link">Fb</div>
                            <div class="other-link">Li</div>
                        </div>
                    </div>
                </div>

                <div class="copyright-bar">
                    <span class="copyright-text"
                        >Juko 2022 © Sva prava pridržana</span
                    >
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import routerService from '@/services/router-service';

export default {
    name: 'Footer',

    setup() {
        return {
            routerService,
        }
    },
};
</script>

<style lang="scss">
.footer {
    @apply w-screen bg-gray-300 text-center
        dark:bg-gray-800 dark:text-gray-200;

    .dark-divider {
        @apply h-px w-full bg-gray-500;
    }

    .footer-main {
        @apply py-10 font-medium;

        .footer-brand {
            @apply flex items-center justify-center my-6;

            .footer-logo {
                @apply h-14;
            }

            .footer-title {
                @apply font-black text-2xl mx-3 my-2 uppercase;
            }
        }

        .footer-nav {
            @apply flex flex-col md:flex-row items-center justify-center my-3;

            .footer-link {
                @apply mx-5 my-1 uppercase font-bold cursor-pointer
                    hover:text-red-500;
            }
        }
    }

    .footer-other {
        @apply flex flex-col justify-between items-center py-4 text-sm text-gray-500
            md:flex-row dark:text-gray-400;

        .helpful-links {
            @apply flex flex-col items-center my-2
                md:flex-row;
        }

        .social-media {
            @apply flex flex-col items-center my-2
                md:flex-row;
        }

        .other-link {
            @apply mx-2 cursor-pointer
                hover:text-gray-900 dark:hover:text-gray-50;
        }
    }

    .copyright-bar {
        @apply text-gray-400 bg-black text-center py-3 px-5;
    }
}
</style>
