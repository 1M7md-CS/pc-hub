import { Routes } from '@angular/router';
import { Home } from './home/home';
import { redirectIfAuthenticated, requireAuthentication } from './guards/auth.guard';

const pageRoutes: { path: string; slug: string }[] = [
  { path: 'faq', slug: 'faq' },
  { path: 'shipping-and-returns', slug: 'shipping-and-returns' },
  { path: 'warranty', slug: 'warranty' },
  { path: 'privacy-policy', slug: 'privacy-policy' },
  { path: 'terms-of-service', slug: 'terms-of-service' },
  { path: 'blog', slug: 'blog' },
  { path: 'careers', slug: 'careers' },
  { path: 'custom-builds', slug: 'custom-builds' },
  { path: 'about-us', slug: 'about-us' },
  { path: 'cookies', slug: 'cookies' },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home',
  },
  {
    path: 'pages/:slug',
    loadComponent: () => import('./page/page').then((m) => m.Page),
  },
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./category-products/category-products').then((m) => m.CategoryProducts),
  },
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts').then((m) => m.Contacts),
    title: 'Contacts',
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart').then((m) => m.CartPage),
    canActivate: [requireAuthentication],
    title: 'Cart',
  },
  {
    path: 'signin',
    loadComponent: () => import('./auth-page/auth-page').then((m) => m.AuthPage),
    canActivate: [redirectIfAuthenticated],
    title: 'Sign in',
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth-page/auth-page').then((m) => m.AuthPage),
    canActivate: [redirectIfAuthenticated],
    title: 'Signup',
  },
  ...pageRoutes.map(({ path, slug }) => ({
    path: path,
    redirectTo: `pages/${slug}`,
    pathMatch: 'full' as const,
  })),
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
    title: 'Not Found',
  },
];
