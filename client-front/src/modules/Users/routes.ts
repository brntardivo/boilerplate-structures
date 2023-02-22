import InternalLayout from '@components/layouts/InternalLayout.vue';

export const usersRoutes = [
  {
    path: '/users',
    component: () => import('@components/layouts/ClearLayout.vue'),
    children: [
      {
        name: 'Users',
        path: '',
        component: () => import('@modules/Users/views/UsersView.vue'),
        meta: {
          authenticated: true,
          showOnNavbar: true,
          navbarLabel: 'Users',
          title: 'Users',
          layout: InternalLayout,
        },
      },
      {
        path: '',
        redirect: {
          name: 'Users',
        },
      },
    ],
  },
];
