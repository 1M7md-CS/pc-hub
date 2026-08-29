import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }
}
