import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient: HttpClient = inject(HttpClient);
  API_URL: string = "http://localhost:8081/api/v1";
  keycloakService: KeycloakService = inject(KeycloakService);
  constructor() { }

  registerUser() {
    const username = this.getUsernameFromToken(this.keycloakService.getKeycloakInstance().token);
    const name = this.getFullNameFromToken(this.keycloakService.getKeycloakInstance().token);
    const keyCloakId = this.keycloakService.getKeycloakInstance().subject;
    return this.httpClient.post(`${this.API_URL}/user`, {
      "username": username,
      "name": name,
      "keyCloakId": keyCloakId
    });
  }

  getUsernameFromToken(token: string | undefined) {
    const jwt = this.keycloakService.getKeycloakInstance().token;
    // @ts-ignore
    return jwt_decode(jwt)["preferred_username"];
  }
  getFullNameFromToken(token: string | undefined) {
    const jwt = this.keycloakService.getKeycloakInstance().token;
    // @ts-ignore
    return jwt_decode(jwt)["given_name"] + " " + jwt_decode(jwt)["family_name"];
  }
}
