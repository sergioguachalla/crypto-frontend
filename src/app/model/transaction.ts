export interface Transaction {
  id: number;
  userId: string;
  cryptocurrencyId: string;
  date: Date;
  type: string;
  quantity: number;
  price: number;
  amount: number;
  selected: string;
}

export interface TransactionDto {
  keycloakUserId: string;
  cryptoName: string;
  date: Date;
  type: string;
  quantity: number;
  price: number;
}
