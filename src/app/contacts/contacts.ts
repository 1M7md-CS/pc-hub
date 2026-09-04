import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription, timer } from 'rxjs';
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
  private resetTimer?: Subscription;

  status = signal<'idle' | 'success' | 'error' | 'sending' | 'invalid'>('idle');

  contactsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),

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
      this.scheduleReset();

      return;
    }

    this.status.set('sending');

    this.httpClient.post('https://formspree.io/f/mdeoaqay', this.contactsForm.value).subscribe({
      next: () => {
        this.status.set('success');
        this.contactsForm.reset();
        this.scheduleReset();
      },

      error: () => {
        this.status.set('error');
        this.scheduleReset();
      },
    });
  }

  private scheduleReset() {
    this.resetTimer?.unsubscribe();
    this.resetTimer = timer(5000).subscribe(() => {
      this.status.set('idle');
    });
  }
}
