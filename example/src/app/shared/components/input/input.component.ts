// * Base
import {
  ReactiveFormsModule,
  ControlContainer,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, SkipSelf, inject } from '@angular/core';

// * Common
import { NgFor, NgIf } from '@angular/common';

// * Types
import { InputTypes } from '../../../types/input.types';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [NgIf, NgFor, ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export default class InputComponent {
  // * Injects
  private readonly controlContainer = inject(ControlContainer);
  // * Inputs
  @Input() type: InputTypes = InputTypes.TEXT;
  @Input() errors?: ValidationErrors | null;
  @Input() placeholder?: string = '';
  @Input() controlName: string = '';
  @Input() class?: string = '';
  @Input() title: string = '';

  get control() {
    return (this.controlContainer.control as AbstractControl).get(
      this.controlName
    );
  }

  protected isControlValid(): boolean {
    return (
      this.control !== null &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }
}
