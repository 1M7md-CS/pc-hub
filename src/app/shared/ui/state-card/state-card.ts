import { Component, input } from '@angular/core';

@Component({
  selector: 'app-state-card',
  imports: [],
  templateUrl: './state-card.html',
  styleUrl: './state-card.css',
})
export class StateCardError {
  state = input.required<'error' | 'empty'>();
}
