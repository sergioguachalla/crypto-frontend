import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private router: Router = inject(Router);
  keycloakService: KeycloakService = inject(KeycloakService);
  constructor() { }



  logout() {
    this.keycloakService.logout().then(r => {
      this.router.navigate(['/']);
    });
  }



}
