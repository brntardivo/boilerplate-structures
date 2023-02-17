import 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    authenticated?: boolean;
    title: string;
    showOnNavbar?: boolean;
    navbarLabel?: string;
  }
}
