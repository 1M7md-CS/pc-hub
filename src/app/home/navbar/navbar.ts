import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }
}
