import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-state-card',
  imports: [Icon],
  templateUrl: './state-card.html',
  styleUrl: './state-card.css',
})
export class StateCardError {
  state = input.required<'error' | 'empty'>();
}
