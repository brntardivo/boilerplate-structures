import InternalLayout from '@components/layouts/InternalLayout.vue';

export const homeRoutes = [
  {
    path: '/home',
    component: () => import('@components/layouts/ClearLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('@modules/Home/views/HomeView.vue'),
        meta: {
          authenticated: true,
          title: 'Home',
          layout: InternalLayout,
        },
      },
      {
        path: '',
        redirect: {
          name: 'Home',
        },
      },
    ],
  },
];
