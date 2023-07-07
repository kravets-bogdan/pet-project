// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';

// * RxJS
import { Subscription } from 'rxjs';

// * Service
import ProductService from '../../service/product.service';

// * Types
import { IGetItemResponse } from '../../types/item.types';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductService],
  imports: [RouterLink, NgIf, CurrencyPipe],
})
export default class ProductComponent implements OnInit, OnDestroy {
  // * Injects
  private readonly productService = inject(ProductService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly route = inject(ActivatedRoute);
  // * Local
  protected item: IGetItemResponse | undefined;
  private routeSubscription!: Subscription;
  protected id: string = '';

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.submit();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  protected submit() {
    if (this.id) {
      this.productService.getProduct({ id: this.id }).subscribe({
        next: (response) => {
          this.item = response;
          this.cdr.detectChanges();
        },
        error: (errorResponse) => {
          console.log('errorResponse: ', errorResponse);
        },
      });
    }
  }
}
