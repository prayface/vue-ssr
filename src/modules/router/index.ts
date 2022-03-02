import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

export default function () {
    return createRouter({
        history: !import.meta.env.SSR ? createWebHistory() : createMemoryHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: () => import('../../views/Home.vue'),
            },
            {
                path: '/:catchAll(.*)*',
                name: '404',
                component: () => import('../../views/404.vue'),
                meta: {
                    title: '404 Not Found',
                },
            },
        ],
    });
}