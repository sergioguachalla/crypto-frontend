import {inject, Injectable} from '@angular/core';
import {HttpClient}   from "@angular/common/http";
import {Observable} from "rxjs";
import {Cryptocurrency} from "../model/cryptocurrency";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  API_URL = 'http://localhost:8080/api/v1/cryptocurrency';

  constructor(private httpClient: HttpClient) {

  }

  getAllCryptocurrencies(): Observable<Cryptocurrency[]> {
    return this.httpClient.get<Cryptocurrency[]>(this.API_URL);
  }
}
