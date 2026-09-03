import { computed, Service, signal } from '@angular/core';
import { AuthResult, Credentials, SignupData, User } from '../models/user-model';

interface StoredUser extends User {
  password: string;
}

const USER_KEY = 'pchub_user';
const USERS_KEY = 'pchub_users';

@Service()
export class Auth {
  user = signal<User | null>(this.load());
  isAuthenticated = computed(() => this.user() !== null);

  signin({ email, password }: Credentials): AuthResult {
    const users = this.getUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return { ok: false, error: 'No account found with this email.' };
    if (found.password !== password) return { ok: false, error: 'Incorrect password.' };
    this.set({ name: found.name, email: found.email });
    return { ok: true };
  }

  signup({ name, email, password }: SignupData): AuthResult {
    const users = this.getUsers();
    if (users.some((u) => u.email === email))
      return { ok: false, error: 'An account with this email already exists.' };
    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    this.set({ name, email });
    return { ok: true };
  }

  logout() {
    localStorage.removeItem(USER_KEY);
    this.user.set(null);
  }

  private set(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  private load(): User | null {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null');
    } catch {
      return null;
    }
  }

  private getUsers(): StoredUser[] {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
