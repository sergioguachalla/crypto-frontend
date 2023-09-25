import {inject, Injectable} from '@angular/core';
import {PortfolioRepository} from "../repository/portfolioRepository";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";
import {Transaction, TransactionDto} from "../model/transaction";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  keycloakService: any = inject(KeycloakService);
  portfolioRepo: PortfolioRepository = inject(PortfolioRepository)
  userId = this.keycloakService.getKeycloakInstance().subject;
  API_URL = environment.API_URL;
  http: HttpClient = inject(HttpClient);
  constructor() { }

  buyCryptoCurrency(amount: number, cryptoId: number){
    let date = new Date();
    let transaction = {
      "quantity": amount,
      "date": new Date(),
      "type": "BUY",
      "userId": this.userId,
      "cryptocurrencyId": cryptoId
    }

    this.http.post(this.API_URL + "transactions", transaction).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveChanges(transactions: Transaction[]) {

    const transactionsDto: TransactionDto[] = transactions.map((transaction: Transaction) => {
      return {
        keycloakUserId: this.keycloakService.getKeycloakInstance().subject,
        cryptoName: transaction.selected,
        date: transaction.date,
        type: transaction.type,
        quantity: transaction.amount,
        price: transaction.amount * 0.054
      }
    });
    console.log(transactionsDto)


    this.http.post(this.API_URL + "transactions/memento",transactionsDto ).subscribe(
      (response: any) => {
        console.log(response);
      }
    );
  }
}
