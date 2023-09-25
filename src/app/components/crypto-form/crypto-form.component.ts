import { Component, inject } from '@angular/core';
import { Cryptocurrency } from "../../model/cryptocurrency";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CryptoService } from "../../services/crypto.service";
import { Router, RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-crypto-form',
  templateUrl: './crypto-form.component.html',
  styleUrls: ['./crypto-form.component.css']
})
export class CryptoFormComponent {
  cryptoService: CryptoService = inject(CryptoService);
  router: Router = inject(Router);
  formBuilder: FormBuilder = inject(FormBuilder);
  cryptoForm: FormGroup;

  constructor() {
    this.cryptoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      symbol: ['', [Validators.required, Validators.minLength(3)]],
      currentPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.cryptoForm.valid) {
      this.cryptoService.createCryptoCurrency(this.cryptoForm.value.name, this.cryptoForm.value.symbol, this.cryptoForm.value.currentPrice);
      this.router.navigate(['/crypto-list']);
    } else {
      console.log('El formulario no es válido');
    }
  }

}
