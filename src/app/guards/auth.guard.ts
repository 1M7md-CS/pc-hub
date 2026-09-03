import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const redirectIfAuthenticated: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isAuthenticated()) return router.parseUrl('/home');
  return true;
};

export const requireAuthentication: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (!auth.isAuthenticated()) return router.parseUrl('/signin');
  return true;
};
