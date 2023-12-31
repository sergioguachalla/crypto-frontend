import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { AuthGuard } from '../guards/auth.guard';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import {HomeComponent} from "../components/home/home.component";
import {CryptoFormComponent} from "../components/crypto-form/crypto-form.component";
import {PortfolioComponent} from "../components/portfolio/portfolio.component";
import {MementoComponent} from "../components/memento/memento.component";

const routes: Routes = [
  {
    path: 'crypto-list',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['VIEW-CRYPTOS']
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-crypto',
    component: CryptoFormComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN-FRONT']
    }
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'memento',
    component: MementoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
