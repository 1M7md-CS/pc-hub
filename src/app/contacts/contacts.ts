import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../shared/ui/icon/icon';
import { SectionHeader } from '../shared/ui/section-header/section-header';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, Icon, SectionHeader],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {}
