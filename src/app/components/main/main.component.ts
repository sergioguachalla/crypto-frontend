import {Component, inject, ViewChild} from '@angular/core';
import {CryptocurrencyRepository} from "../../repository/cryptocurrencyRepository";
import {CryptoService} from "../../services/crypto.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cryptocurrency} from "../../model/cryptocurrency";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {


  cryptoService : CryptoService = inject(CryptoService);
  cryptocurrencyRepository: CryptocurrencyRepository = inject(CryptocurrencyRepository);
  authService : AuthService = inject(AuthService);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Cryptocurrency> = new MatTableDataSource<Cryptocurrency>([]);
  displayedColumns = ['Id', 'Name', 'Symbol', 'Current Price', 'Editar', 'Borrar'];
  cryptos$ = this.cryptocurrencyRepository.cryptos$;
  maxSize : number = 0;

  constructor() {
    this.cryptoService.getCryptocurrencies(0, 5).subscribe();
  }
  ngOnInit() {
    this.authService.getAccessToken();

    this.cryptos$
      .subscribe((response) => {
        console.log(response);
        const currencyProps = this.cryptocurrencyRepository.getCurrencyProps();
        this.maxSize = Number(currencyProps.totalElements);
        this.dataSource.data =  response;
  }
      );
  }
  pageChangeEvent($event: PageEvent) {
    this.cryptoService.getCryptocurrencies($event.pageIndex, 5).subscribe();
  }



  addCryptoCurrency() {
    const cryptoName = prompt("Ingrese el nombre de la criptomoneda");

    if (cryptoName !== null) {
      console.log("Nombre de la criptomoneda ingresado:", cryptoName);

      (this.cryptoService.addCryptoCurrency(cryptoName));

    }
  }

  updateCryptoPrice(id: number){
    const newPrice = prompt("Ingrese el nuevo precio de la criptomoneda");
    console.log("id: ", id);
    this.cryptoService.updateCryptoCurrency(id, Number(newPrice));
  }








}
