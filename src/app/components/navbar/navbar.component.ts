import {Component, inject} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  keycloakService: KeycloakService = inject(KeycloakService);
  username: string | undefined;
  ngOnInit(){
    this.keycloakService.getKeycloakInstance().loadUserProfile().then((profile) => {
      this.username = profile.username;
    });
  }

  logout(){
    this.keycloakService.logout();
  }

  getUsername(token: String){

  }
}
