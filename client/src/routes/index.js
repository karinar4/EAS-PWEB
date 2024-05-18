import { createWebHistory, createRouter } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue';

const routes = [
    {
        path: '/',
        component: LandingPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;