import {Component, inject} from '@angular/core';
import {CryptocurrencyRepository} from "../../repository/cryptocurrencyRepository";
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
  dataSource = this.cryptoRepository.cryptos$;
  ngOnInit(): void {
    this.cryptoService.getCryptocurrencies().subscribe();

  }

  displayedColumns = ['Id', 'Name', 'Symbol', 'Current Price', 'Editar', 'Borrar'];

  addCryptoCurrency() {
    const cryptoName = prompt("Ingrese el nombre de la criptomoneda");

    if (cryptoName !== null) {
      console.log("Nombre de la criptomoneda ingresado:", cryptoName);

      this.cryptoService.addCryptoCurrency(cryptoName).subscribe();

    }
  }


}
