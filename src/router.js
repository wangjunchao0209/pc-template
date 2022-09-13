import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/home",
        component: () => import("@/views/home.vue"),
        meta: {
            include: true,
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
