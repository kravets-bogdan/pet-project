// * Base
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// * Service
import AuthService from 'src/app/service/auth.service';

// * Config
import { FormConfig } from 'src/app/congif/form.config';

// * Shared
import InputComponent from '../../../shared/components/input/input.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, InputComponent],
})
export default class LoginComponent extends FormConfig {
  // * Injects
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    super();
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.auth.login(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.initForm();
          this.router.navigateByUrl('/admin/dashboard');
        },
        error: (errorResponse) => {
          this.form.enable();
          this.readErrors(errorResponse.error.errors);
        },
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }
}
