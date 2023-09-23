import { Component } from '@angular/core';
import {Cryptocurrency} from "../../model/cryptocurrency";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crypto-form',
  templateUrl: './crypto-form.component.html',
  styleUrls: ['./crypto-form.component.css']
})
export class CryptoFormComponent {
  formData: Cryptocurrency = <Cryptocurrency>{
    name: '',
    symbol: '',
    currentPrice: 0
  };

  constructor() { }

  onSubmit() {
    console.log(this.formData);
  }

}
