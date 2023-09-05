import {inject, Injectable} from '@angular/core';
import {HttpClient}   from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Cryptocurrency} from "../model/cryptocurrency";
import {ApiResponse} from "../model/apiResponse";
import {CryptocurrencyRepository} from "../repository/cryptocurrencyRepository";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  API_URL = 'http://localhost:8080/api/v1/cryptocurrency';
  private httpClient: HttpClient = inject(HttpClient);
  private cryptoRepository: CryptocurrencyRepository = inject(CryptocurrencyRepository);
  constructor() {

  }

  getCryptocurrencies() {
    return this.httpClient.get<ApiResponse<Cryptocurrency[]>>(this.API_URL).pipe(
      map((response: ApiResponse<Cryptocurrency[]>) => response.response || []),
      tap((cryptos) => this.cryptoRepository.setCryptos(cryptos))
    );
  }

}
