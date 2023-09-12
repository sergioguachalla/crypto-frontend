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
  API_URL = 'http://localhost:8081/api/v1/cryptocurrency';
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

  addCryptoCurrency(name: string): Observable<Cryptocurrency | null> {
    return this.httpClient.post<ApiResponse<Cryptocurrency>>(this.API_URL, { name }).pipe(
      map((response: ApiResponse<Cryptocurrency>) => response.response),
      tap((crypto) => {
        if (crypto) {
          this.cryptoRepository.addCryptoCurrency(crypto as Cryptocurrency);
        }
      })
    );
  }

  updateCryptoCurrency(cryptoId: number, price: number) {
    return this.httpClient.put(this.API_URL + "/" + cryptoId + "/price", {currentPrice: price}).pipe(
      tap((crypto) => this.cryptoRepository.updateCryptoCurrency(crypto as Cryptocurrency))
    ).subscribe();
  }

  deleteCryptoCurrency(cryptoId: number) {
    return this.httpClient.put(this.API_URL + "/" + cryptoId, {id:cryptoId}).pipe(
      tap((crypto) => this.cryptoRepository.deleteCryptoCurrency(crypto as Cryptocurrency ))
    );
  }

}
