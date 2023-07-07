// * Base
import {
  ChangeDetectionStrategy,
  OnDestroy,
  Component,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

// * Config
import { FormConfig } from 'src/app/congif/form.config';

// * Shared
import InputComponent from '../../../shared/components/input/input.component';

// * Service
import ProductService from 'src/app/service/product.service';

// * RxJS
import { Subscription } from 'rxjs';

// * Types
import { IGetItemResponse } from '../../../types/item.types';

@Component({
  standalone: true,
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf, NgFor, InputComponent],
})
export default class UpdateComponent extends FormConfig implements OnDestroy {
  // * Injects
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  // * Local
  protected item: IGetItemResponse | undefined;
  private routeSubscription!: Subscription;
  protected id: string = '';

  constructor() {
    super();
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getItem();
    this.initForm();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.productService.updateProduct(this.form.value).subscribe({
        next: (response) => {
          console.log('response: ', response);
          this.form.enable();
          this.initForm();
          this.router.navigateByUrl('/admin/dashboard');
          this.update();
        },
        error: (errorResponse) => {
          this.form.enable();
        },
      });
    }
  }

  initForm() {
    if (this.item) {
      this.form = this.fb.group({
        id: this.id,
        nameUa: [this.item.name.ua, Validators.required],
        nameEn: [this.item.name.en, Validators.required],
        price: [this.item.price, Validators.required],
        descriptionUa: [this.item.description.ua, Validators.required],
        descriptionEn: [this.item.description.en, Validators.required],
        amount: [this.item.amount, Validators.required],
      });
    }
  }

  protected getItem() {
    if (this.id) {
      this.loading = true;
      this.productService.getProduct({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
          this.loading = false;
          this.initForm();
          this.update();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }
}
