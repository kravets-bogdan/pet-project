// * Base
import { Pipe, PipeTransform } from '@angular/core';

// * Types
import { IGetItemResponse } from '../types/item.types';

@Pipe({
  name: 'searchProduct',
  standalone: true,
})
export default class SearchProductPipe implements PipeTransform {
  transform(products: IGetItemResponse[], search = ''): IGetItemResponse[] {
    if (!search.trim()) {
      return products;
    }
    return products.filter((product) => {
      return product.name.en.toLowerCase().includes(search.toLowerCase());
    });
  }
}
