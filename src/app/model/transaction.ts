export interface Transaction {
  id: number;
  userId: string;
  cryptocurrencyId: number;
  date: Date;
  type: string;
  quantity: number;
  price: number;
}
