import {inject, Injectable} from '@angular/core';
import {PortfolioRepository} from "../repository/portfolioRepository";
import {KeycloakService} from "keycloak-angular";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  keycloakService: any = inject(KeycloakService);
  portfolioRepo: PortfolioRepository = inject(PortfolioRepository)
  userId = this.keycloakService.getKeycloakInstance().subject;
  API_URL = "http://localhost:8081/api/v1/";
  http: HttpClient = inject(HttpClient);
  constructor() { }

  buyCryptoCurrency(amount: number, cryptoId: number){
    let date = new Date();
    let transaction = {
      "quantity": amount,
      "date": date,
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
}
