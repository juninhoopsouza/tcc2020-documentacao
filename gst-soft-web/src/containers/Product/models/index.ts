export interface IStock {
  number: string;
  quantity: number;
}

export interface IProduct {
  code: string;
  color: string;
  stock: IStock[];
}
