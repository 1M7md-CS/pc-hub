import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/ui/icon/icon';
import { StateCard } from "../shared/ui/state-card/state-card";

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon, StateCard],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
