import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiResponse} from "../model/apiResponse";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://localhost:8081/api/v1/auth/token';
  private httpClient: HttpClient = inject(HttpClient);


  constructor() { }

  getAccessToken() {

    this.httpClient.get<ApiResponse<String>>(`${this.API_URL}`).pipe(
      map((response: ApiResponse<String>) => response.response)
    ).subscribe((response) => {


        console.log(response);
        localStorage.setItem('token', response as string);

      }
    );

  }
}
