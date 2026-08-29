import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
