import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { MainComponent } from '../components/main/main.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'cryptos', component: MainComponent, canActivate:[AuthGuard],
data:{
  roles:['VIEW-CRYPTOS'],
} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }