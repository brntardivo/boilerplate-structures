import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '@modules/Auth/routes';
import { homeRoutes } from '@modules/Home/routes';
import { useAuthStore } from '@stores/auth';

const appTitle = import.meta.env.VITE_APP_TITLE;

const defaultRoute = 'Home';
const signInRoute = 'AuthSignIn';

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: defaultRoute,
    },
  },
  ...homeRoutes,
  ...authRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.matched.some((record) => record.meta.authenticated)) {
    if (!store.getJWTState) {
      next({
        name: signInRoute,
        query: { redirect: to.fullPath },
      });

      return;
    }
  }

  next();
});

router.afterEach((to) => {
  document.title = `${appTitle} | ${to.meta.title}`;
});

export default router;
