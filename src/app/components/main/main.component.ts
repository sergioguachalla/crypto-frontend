import {Component, inject} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {CryptocurrencyRepository} from "../../repository/cryptocurrencyRepository";
import {Cryptocurrency} from "../../model/cryptocurrency";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  //cryptoRepository: CryptocurrencyRepository = inject(CryptocurrencyRepository)
  constructor(public cryptoRepository: CryptocurrencyRepository) {
  }


  cryptos: Cryptocurrency[] = [];
  displayedColumns = ['id', 'name', 'symbol', 'currentPrice'];

  ngOnInit(): void {
     this.cryptoRepository.getAllCryptocurrencies();


}
}
