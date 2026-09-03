import { Component, DestroyRef, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Auth } from '../services/auth';
import { Icon } from '../shared/ui/icon/icon';

@Component({
  selector: 'app-auth-page',
  imports: [RouterLink, Icon, ReactiveFormsModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  private auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  mode = signal<'login' | 'signup'>('login');
  status = signal<'idle' | 'sending' | 'error'>('idle');
  errorMessage = signal('');

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  title = computed(() => (this.mode() === 'login' ? 'Welcome back' : 'Create your account'));
  subtitle = computed(() =>
    this.mode() === 'login'
      ? 'Sign in to access your cart and builds.'
      : 'Join PcHub to track builds and deals.',
  );
  submitLabel = computed(() => (this.mode() === 'login' ? 'Sign in' : 'Create account'));
  switchPrefix = computed(() =>
    this.mode() === 'login' ? 'New to PcHub?' : 'Already have an account?',
  );
  switchLink = computed(() => (this.mode() === 'login' ? '/signup' : '/login'));
  switchAction = computed(() =>
    this.mode() === 'login' ? 'Create an account' : 'Sign in',
  );

  constructor() {
    this.route.url.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((segments) => {
      const path = segments.map((s) => s.path).join('/');
      this.mode.set(path === 'signup' ? 'signup' : 'login');
    });

    effect(() => {
      if (this.mode() === 'login') {
        this.form.get('name')?.clearValidators();
      } else {
        this.form.get('name')?.setValidators([Validators.required, Validators.maxLength(50)]);
      }
      this.form.get('name')?.updateValueAndValidity({ emitEvent: false });
      this.form.reset();
      this.status.set('idle');
      this.errorMessage.set('');
    });
  }

  fieldInvalid(name: string) {
    const ctrl = this.form.get(name);
    return ctrl?.invalid && ctrl?.touched;
  }

  onSubmit() {
    if (this.status() === 'sending') return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    const { name, email, password } = this.form.value;
    const result =
      this.mode() === 'signup'
        ? this.auth.signup({ name: name!, email: email!, password: password! })
        : this.auth.login({ email: email!, password: password! });

    if (result.ok) {
      this.router.navigate(['/home']);
    } else {
      this.status.set('error');
      this.errorMessage.set(result.error!);
    }
  }
}
