import InternalLayout from '@components/layouts/InternalLayout.vue';

export const adminsRoutes = [
  {
    path: '/admins',
    component: () => import('@components/layouts/ClearLayout.vue'),
    children: [
      {
        name: 'Admins',
        path: '',
        component: () => import('@modules/Admins/views/AdminsView.vue'),
        meta: {
          authenticated: true,
          showOnNavbar: true,
          navbarLabel: 'Admins',
          title: 'Admins',
          layout: InternalLayout,
        },
      },
      {
        path: '',
        redirect: {
          name: 'Admins',
        },
      },
    ],
  },
];
