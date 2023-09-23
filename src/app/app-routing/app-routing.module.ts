import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { AuthGuard } from '../guards/auth.guard';
import { ForbiddenComponent } from '../components/forbidden/forbidden.component';
import {HomeComponent} from "../components/home/home.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
