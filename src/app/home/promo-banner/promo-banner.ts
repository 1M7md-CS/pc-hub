import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-promo-banner',
  templateUrl: './promo-banner.html',
  styleUrl: './promo-banner.css',
  imports: [RouterLink, Icon],
})
export class PromoBanner {}
