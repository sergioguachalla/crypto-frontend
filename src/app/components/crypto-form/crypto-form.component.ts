import {Component, inject} from '@angular/core';
import {Cryptocurrency} from "../../model/cryptocurrency";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {CryptoService} from "../../services/crypto.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-crypto-form',
  templateUrl: './crypto-form.component.html',
  styleUrls: ['./crypto-form.component.css']
})
export class CryptoFormComponent {
  cryptoService: CryptoService = inject(CryptoService);
  router: Router = inject(Router);
  formData: Cryptocurrency = <Cryptocurrency>{
    name: '',
    symbol: '',
    currentPrice: 0
  };

  constructor() { }

  onSubmit() {
    this.cryptoService.createCryptoCurrency(this.formData.name, this.formData.symbol, this.formData.currentPrice)

    this.router.navigate(['/crypto-list']);
    console.log(this.formData);
  }

}
