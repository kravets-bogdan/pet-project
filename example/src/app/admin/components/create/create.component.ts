// * Base
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

// * Config
import { FormConfig } from 'src/app/congif/form.config';

// * Shared
import InputComponent from '../../../shared/components/input/input.component';

// * Service
import ProductService from 'src/app/service/product.service';

@Component({
  standalone: true,
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, InputComponent, RouterLink],
})
export default class CreateComponent extends FormConfig {
  // * Injects
  private readonly productService = inject(ProductService);

  constructor() {
    super();
    this.initForm();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.productService.createProduct(this.form.value).subscribe({
        next: (response) => {
          this.form.enable();
          this.loading = false;
          this.initForm();
          this.update();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
          this.loading = false;
          this.form.enable();
        },
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      nameUa: ['', Validators.required],
      nameEn: ['', Validators.required],
      price: ['', Validators.required],
      descriptionUa: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
}
