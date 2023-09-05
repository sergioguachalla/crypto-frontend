import {Component, inject} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CryptocurrencyRepository} from "../../repository/cryptocurrencyRepository";
import {Cryptocurrency} from "../../model/cryptocurrency";
import {CryptoService} from "../../services/crypto.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  cryptoService : CryptoService = inject(CryptoService);
  constructor(public cryptoRepository: CryptocurrencyRepository) {
  }

  ngOnInit(): void {
    this.cryptoService.getCryptocurrencies().subscribe();

  }

  displayedColumns = ['id', 'name', 'symbol', 'currentPrice'];


}
