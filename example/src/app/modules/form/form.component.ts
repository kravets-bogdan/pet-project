// * Base
import {
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

// * Config
import { FormConfig } from 'src/app/congif/form.config';

// * Shared
import InputComponent from '../../shared/components/input/input.component';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, NgFor, InputComponent],
})
export default class FormComponent extends FormConfig {
  constructor() {
    super();
    this.initForm();
  }

  get phones(): FormArray {
    return this.form.controls['phones'] as FormArray;
  }

  protected addPhone() {
    (<FormArray>this.form.controls['phones']).push(
      new FormControl('+380', Validators.required)
    );
  }

  protected deletePhone(i: number) {
    this.phones.removeAt(i);
  }

  submit() {
    this.form.markAllAsTouched();
    console.log('  this.form: ', this.form);
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      console.log('this.form.value: ', this.form.value);
    }
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          this.patternValidator(/[a-z, A-Z]/, {
            hasWord: true,
          }),
          this.patternValidator(/\d/, {
            hasNumber: true,
          }),
          this.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
            hasSpecialCharacters: true,
          }),
        ]),
      ],
      phones: this.fb.array(
        ['+380'],
        this.patternValidator(/\d/, {
          hasNumber: true,
        })
      ),
    });
  }

  private patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
