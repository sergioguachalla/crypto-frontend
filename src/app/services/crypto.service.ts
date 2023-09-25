import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Cryptocurrency} from "../model/cryptocurrency";
import {ApiResponse} from "../model/paginator";
import {CryptocurrencyRepository} from "../repository/cryptocurrencyRepository";
import {Paginator} from "../model/paginator";
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  API_URL = 'http://localhost:8081/api/v1/cryptocurrency';
  private httpClient: HttpClient = inject(HttpClient);
  private cryptoRepository: CryptocurrencyRepository = inject(CryptocurrencyRepository);
  constructor() {

  }

  getCryptocurrencies(page: number, size:number) {

    return this.httpClient.get<ApiResponse<Paginator<Cryptocurrency>>>(`${this.API_URL}?page=${page}&size=${size}` )
      .pipe(
        tap((response) => {
          this.cryptoRepository.setCryptos(response.response)
          this.cryptoRepository.setUIState(false, null);
        }
      )
      );
  }


  getAllCryptocurrencies(): Observable<string[]> {
    return this.httpClient.get<ApiResponse<Cryptocurrency[]>>(this.API_URL + '/all').pipe(
      map((response: ApiResponse<Cryptocurrency[]>) => {
        return response.response.map((crypto: Cryptocurrency) => crypto.name);
      })
    );
  }

  addCryptoCurrency(name: string) {

    this.httpClient.post<ApiResponse<String>>(this.API_URL, {name}).pipe(
      map((response: ApiResponse<String>) => response.response)
    ).subscribe((response) => {
        alert(response);
        this.getCryptocurrencies(this.cryptoRepository.getCurrencyProps().totalPages-1, 5).subscribe();
      }
    );
  }



  updateCryptoCurrency(cryptoId: number, price: number) {
    this.httpClient
      .put<ApiResponse<String>>(`${this.API_URL}/${cryptoId}/price`, {
        currentPrice: price,
      })
      .pipe(
        map((response: ApiResponse<String>) => response.response),
        tap((response) => {
          alert(response);
          this.getCryptocurrencies(this.cryptoRepository.getCurrencyProps().currentPage, 5).subscribe();
        })
      )
      .subscribe();
  }

  deleteCryptoCurrency(cryptoId: number) {
    this.httpClient
      .put<ApiResponse<String>>(`${this.API_URL}/${cryptoId}`, {
        id: cryptoId,
      })
      .pipe(
        map((response: ApiResponse<String>) => response.response),
        tap((response) => {
          alert(response);
          this.getCryptocurrencies(this.cryptoRepository.getCurrencyProps().currentPage, 5).subscribe();
        })
      )
      .subscribe();
  }


  /*


  }

  deleteCryptoCurrency(cryptoId: number) {
    return this.httpClient.put(this.API_URL + "/" + cryptoId, {id:cryptoId}).pipe(
      tap((crypto) => this.cryptoRepository.deleteCryptoCurrency(crypto as Cryptocurrency ))
    );
  }

   */

}
