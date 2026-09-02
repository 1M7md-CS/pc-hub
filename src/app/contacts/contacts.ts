import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { timer } from 'rxjs';
import { Icon } from '../shared/ui/icon/icon';
import { SectionHeader } from '../shared/ui/section-header/section-header';

@Component({
  selector: 'app-contact',
  imports: [RouterLink, Icon, SectionHeader, ReactiveFormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class Contacts {
  private httpClient = inject(HttpClient);

  status = signal<'idle' | 'success' | 'error' | 'sending' | 'invalid'>('idle');

  contactsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    message: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(1000),
    ]),
  });

  onSubmit() {
    if (this.status() === 'sending') return;

    if (this.contactsForm.invalid) {
      this.contactsForm.markAllAsTouched();
      this.status.set('invalid');
      timer(5000).subscribe(() => {
        this.status.set('idle');
      });

      return;
    }

    this.status.set('sending');

    this.httpClient.post('https://formspree.io/f/mdeoaqay', this.contactsForm.value).subscribe({
      next: () => {
        this.status.set('success');
        this.contactsForm.reset();

        timer(5000).subscribe(() => {
          this.status.set('idle');
        });
      },

      error: () => {
        this.status.set('error');

        timer(5000).subscribe(() => {
          this.status.set('idle');
        });
      },
    });
  }
}
