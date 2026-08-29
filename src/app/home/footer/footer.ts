import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon/icon';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
