export interface IItem {
  code: string;
  number: string;
  quantity: number;
}

export interface IOrder {
  id: number;
  date: string;
  items: IItem[];
}
