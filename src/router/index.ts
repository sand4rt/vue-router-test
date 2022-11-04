import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteRecordNormalized } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import AdminPage from '../pages/AdminPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: {
        authRequired: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    },
  ]
})

function isAuthenticated() {
  return Promise.resolve(!!localStorage.getItem('authenticated'));
}

function isAuthRequired(route: RouteLocationNormalized) {
  return route.matched.some((route) => route.meta.authRequired);
}

router.beforeEach(async (to, from, next) => {
  const authenticated = await isAuthenticated();
  
  if (authenticated && to.name === 'login') return next({ name: 'admin' });

  if (!isAuthRequired(to)) return next();

  if (authenticated) return next();

  return next({
    name: 'login',
    query: { redirectFrom: to.fullPath },
  });
})

export default router;
