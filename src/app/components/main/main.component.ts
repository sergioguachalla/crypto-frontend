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
  constructor() {
  }
  dataSource = inject(CryptocurrencyRepository).cryptos$;
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

  updatePrice(cryptoId: number) {
    const cryptoPrice = prompt("Ingrese el precio de la criptomoneda");

    if (cryptoPrice !== null) {
      console.log("Precio de la criptomoneda ingresado:", cryptoPrice);

      this.cryptoService.updateCryptoCurrency(cryptoId, Number(cryptoPrice));
      this.cryptoService.getCryptocurrencies().subscribe();

    }
  }

  deleteCryptoCurrency(cryptoId: number) {
    this.cryptoService.deleteCryptoCurrency(cryptoId).subscribe();
    alert("La criptomoneda ha sido eliminada");
  }


}
