import ExternalLayout from '@components/layouts/ExternalLayout.vue';

export const authRoutes = [
  {
    path: '/auth',
    component: () => import('@components/layouts/ClearLayout.vue'),
    children: [
      {
        name: 'AuthSignIn',
        path: 'sign-in',
        component: () => import('@modules/Auth/views/SignInView.vue'),
        meta: {
          title: 'Sign In',
          layout: ExternalLayout,
        },
      },
      {
        path: '',
        redirect: {
          name: 'AuthSignIn',
        },
      },
    ],
  },
];
