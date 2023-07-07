// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

// * Service
import ProductService from '../../service/product.service';

// * Pipes
import SearchProductPipe from '../../pipes/search-product.pipe';

// * Types
import { IGetItemResponse } from '../../types/item.types';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
  imports: [RouterLink, NgFor, FormsModule, NgIf, SearchProductPipe, NgFor],
})
export default class MainComponent {
  // * Injects
  private readonly productService = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);
  // * Local
  protected list: IGetItemResponse[] = [];
  protected loading: boolean = false;
  protected searchStr: string = '';

  constructor() {
    this.submit();
  }

  protected submit() {
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
}
