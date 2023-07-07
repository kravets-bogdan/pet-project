// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// * Service
import ProductService from 'src/app/service/product.service';

// * Pipes
import SearchProductPipe from 'src/app/pipes/search-product.pipe';

// * Types
import { IGetItemResponse } from '../../../types/item.types';

@Component({
  standalone: true,
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SearchProductPipe,
    CurrencyPipe,
    FormsModule,
    RouterLink,
    NgFor,
    NgIf,
  ],
})
export default class AdminMainComponent {
  // * Injects
  private readonly productService = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);
  // * Local
  protected list: IGetItemResponse[] = [];
  protected loading: boolean = false;
  protected searchStr: string = '';
  protected message: string = '';

  constructor() {
    this.submit();
  }

  submit() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.loading = false;
        this.list = response;
        this.cdr.detectChanges();
      },
      error: (errorResponse) => {
        console.log('errorResponse: ', errorResponse);
      },
    });
  }

  protected deleteItem(id: string) {
    if (id) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          this.message = response.message;
          setTimeout(() => {
            this.message = '';
          }, 2000);
          this.cdr.detectChanges();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }
}
