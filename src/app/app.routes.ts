import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Page } from './page/page';

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
  },
  {
    path: 'pages/:slug',
    component: Page,
  },
  ...pageRoutes.map(({ path, slug }) => ({
    path: path,
    redirectTo: `pages/${slug}`,
    pathMatch: 'full' as const,
  })),
];
