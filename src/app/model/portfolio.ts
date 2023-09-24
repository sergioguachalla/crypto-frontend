export interface Portfolio {
  id: number;
  keycloakUserId?: string | null;
  cryptocurrencyName: string;
  cryptocurrencySymbol: string;
  totalAmount: number;
  amountInUsd: number;
}

