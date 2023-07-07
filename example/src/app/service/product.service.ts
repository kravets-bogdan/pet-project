// * Base
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// * Types
import { IAddItemRequestData, IGetItemResponse } from '../types/item.types';

interface ItemResponse {
  succes: boolean;
  message: string;
}

interface ItemRequestData {
  id: string;
}

@Injectable()
export default class ProductService {
  // * Inject
  private readonly http = inject(HttpClient);
  // * Local
  private readonly api: string = 'http://localhost:3000/api';

  createProduct(data: IAddItemRequestData) {
    return this.http.post<ItemResponse>(`${this.api}/items/additems`, data);
  }

  getProducts() {
    return this.http.get<IGetItemResponse[]>(`${this.api}/items/additems`);
  }

  getProduct(id: ItemRequestData) {
    return this.http.post<IGetItemResponse>(`${this.api}/items/getItem`, id);
  }

  deleteProduct(id: string) {
    return this.http.delete<ItemResponse>(`${this.api}/items/deleteItem/` + id);
  }

  updateProduct(data: IGetItemResponse) {
    return this.http.put<ItemResponse>(`${this.api}/items/updateItem`, data);
  }
}
