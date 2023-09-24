export interface InvestmentPosition{
  id: number;
  cryptocurrencyId: number;
  amount: number;
  purchasePrice: number;
  purchaseDate: Date;
  userId?: string;
}
