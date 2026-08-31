import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/ui/icon/icon';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
