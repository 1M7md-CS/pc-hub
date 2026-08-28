import { Routes } from '@angular/router';

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
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
  {
    path: 'pages/:slug',
    loadComponent: () => import('./page/page').then(m => m.Page),
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./category-products/category-products').then(m => m.CategoryProducts),
  },
  ...pageRoutes.map(({ path, slug }) => ({
    path: path,
    redirectTo: `pages/${slug}`,
    pathMatch: 'full' as const,
  })),
];
