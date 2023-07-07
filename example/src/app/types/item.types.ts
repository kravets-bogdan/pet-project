export interface IAddItemRequestData {
  name: { ua: string; en: string };
  price: number;
  amount: number;
  description: { ua: string; en: string };
}

export interface IGetItemResponse extends IAddItemRequestData {
  _id: string;
}
