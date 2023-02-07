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
        name: 'AuthSignUp',
        path: 'sign-up',
        component: () => import('@modules/Auth/views/SignUpView.vue'),
        meta: {
          title: 'Sign Up',
          layout: ExternalLayout,
        },
      },
      {
        name: 'AuthForgotPassword',
        path: 'forgot-password',
        component: () => import('@modules/Auth/views/ForgotPasswordView.vue'),
        meta: {
          title: 'Forgot Password',
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
