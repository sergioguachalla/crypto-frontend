import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from "keycloak-angular";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private router: Router = inject(Router);
  keycloakService: KeycloakService = inject(KeycloakService);
  constructor() { }

  ngOnInit() {

    this.getDecodedAccessToken(this.keycloakService.getKeycloakInstance().token+"");


  }

  logout() {
    this.keycloakService.logout().then(r => {
      this.router.navigate(['/']);
    });
  }

  getDecodedAccessToken(token: string): String {
    const decodedToken: any = jwt_decode(token);
    // @ts-ignore
    console.log(decodedToken['sid'])
    return decodedToken['sid']
  }

}
