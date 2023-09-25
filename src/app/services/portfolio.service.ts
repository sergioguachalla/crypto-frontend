import {inject, Injectable} from '@angular/core';
import {PortfolioRepository} from "../repository/portfolioRepository";
import {HttpClient} from "@angular/common/http";
import {ApiResponse, Paginator} from "../model/paginator";
import {tap} from "rxjs";
import {Portfolio} from "../model/portfolio";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  keycloakService: KeycloakService = inject(KeycloakService);
  portfolioRepository: PortfolioRepository = inject(PortfolioRepository);
  httpClient: HttpClient = inject(HttpClient);
  API_URL = 'http://localhost:8081/api/v1/portfolio';
  constructor() { }

  getPortfolio(page: number, size: number) {
    const userId = this.keycloakService.getKeycloakInstance().subject;
      return this.httpClient.get<ApiResponse<Paginator<Portfolio>>>(`${this.API_URL}?userId=${userId}&page=${page}&size=${size}`)
      .pipe(

        tap((response) => {
          this.portfolioRepository.setPortfolio(response.response)

          }
        )
      );

  }
}
