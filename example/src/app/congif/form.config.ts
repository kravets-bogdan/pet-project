// * Base
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { ChangeDetectorRef, inject, Injectable } from '@angular/core';

// * Types
import { InputTypes } from '../types/input.types';

@Injectable({
  providedIn: 'root',
})
export abstract class FormConfig {
  // * Injects
  private readonly cdr = inject(ChangeDetectorRef);
  protected readonly fb = inject(FormBuilder);
  // * Types
  protected readonly InputTypes = InputTypes;
  // * Base
  protected loading: boolean = false;
  protected errorMes: string = '';
  protected form!: FormGroup;

  constructor() {
    this.initForm();
  }

  abstract initForm(): void;
  abstract submit(): void;

  readErrors(errors: ValidationErrors) {
    Object.keys(errors).forEach((k) => {
      this.errorMes = errors[k];
    });
    this.loading = false;
    this.form.enable();
    this.update();
  }

  isControlValid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string) {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  protected update() {
    this.cdr.detectChanges();
  }
}
