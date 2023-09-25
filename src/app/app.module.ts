import { APP_INITIALIZER, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import { DialogComponent } from './components/dialog/dialog.component';
import {FormsModule} from "@angular/forms";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import { CryptoFormComponent } from './components/crypto-form/crypto-form.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BuySellDialogComponent } from './components/buy-sell-dialog/buy-sell-dialog.component';
import { MementoComponent } from './components/memento/memento.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';


function  initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'arquitectura',
        clientId: 'frontend'
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        const isGetRequest = 'GET' === method.toUpperCase();
        const acceptablePaths = ['http://localhost:8081/api/v1/auth/token'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );

        return !(isGetRequest && isAcceptablePathMatch);
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ForbiddenComponent,
    HomeComponent,
    DialogComponent,
    CryptoFormComponent,
    PortfolioComponent,
    BuySellDialogComponent,
    MementoComponent,
    TransactionDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    KeycloakAngularModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
