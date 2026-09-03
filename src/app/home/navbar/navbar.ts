import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private auth = inject(Auth);

  readonly isMenuOpen = signal(false);
  readonly isDropdownOpen = signal(false);
  readonly user = this.auth.user;
  readonly isAuthenticated = this.auth.isAuthenticated;

  toggleMenu() {
    this.isDropdownOpen.set(false);
    this.isMenuOpen.update((val) => !val);
  }

  toggleDropdown() {
    this.isMenuOpen.set(false);
    this.isDropdownOpen.update((val) => !val);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
    this.isMenuOpen.set(false);
  }

  logout() {
    this.auth.logout();
    this.isDropdownOpen.set(false);
  }
}
