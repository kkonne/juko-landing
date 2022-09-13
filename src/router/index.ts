import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products.vue'),
    },
    {
        path: '/about-us',
        name: 'aboutus',
        component: () => import('../views/About.vue'),
    },
    {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/Contact.vue'),
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/404.vue'),
        meta: { hideNavigation: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            };
        }

        if (to == from) {
            return {
                top: 0,
                behavior: 'smooth',
            };
        }

        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
