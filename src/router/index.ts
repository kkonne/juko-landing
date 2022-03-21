import routerService from '@/services/router-service';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/proizvodi',
        component: () => import('../views/Products.vue'),
        children: [
            {
                path: '',
                name: 'Products',
                redirect: { name: 'Products category', params: { id: 'svi' } },
            },
            {
                path: ':id',
                name: 'Products category',
                component: () => import('../views/proizvodi/Category.vue'),
            },
        ],
    },
    {
        path: '/partneri',
        name: 'Partneri',
        component: () => import('../views/Partneri.vue'),
    },
    {
        path: '/artikal',
        component: () => import('../views/Artikal.vue'),
        children: [
            {
                path: ':id',
                name: 'Artikal',
                component: () => import('../views/artikal/Index.vue'),
            },
        ],
    },
    {
        path: '/o-nama',
        name: 'O nama',
        component: () => import('../views/Onama.vue'),
    },
    {
        path: '/kontakt',
        name: 'Kontakt',
        component: () => import('../views/Kontakt.vue'),
    },
    {
        path: '/admin',
        component: () => import('../views/Admin.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'Admin',
                component: () => import('../views/admin/Index.vue'),
            },
            {
                path: 'artikal',
                name: 'Admin Artikal',
                component: () => import('../views/admin/Artikal.vue'),
            },
            {
                path: 'kategorija',
                name: 'Admin Kategorija',
                component: () => import('../views/admin/Kategorija.vue'),
            },
            {
                path: 'content',
                name: 'Admin Content',
                component: () => import('../views/admin/Content.vue'),
            },
        ],
    },
    {
        path: '/b2b',
        component: () => import('../views/B2b.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'B2b',
                component: () => import('../views/b2b/Index.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { hideNavigation: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: { hideNavigation: true },
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

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        next();
        return;
    }

    const isUserLoggedIn = !!sessionStorage.getItem('user-auth-token');
    if (!isUserLoggedIn) {
        routerService.setAfterLoginUrl(to.path);
        next({ name: 'Login' });
    } else {
        next();
    }
});

export default router;
