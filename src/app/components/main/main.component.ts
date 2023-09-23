import {Component, inject, ViewChild} from '@angular/core';
import {CryptocurrencyRepository} from "../../repository/cryptocurrencyRepository";
import {CryptoService} from "../../services/crypto.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Cryptocurrency} from "../../model/cryptocurrency";
import {KeycloakService} from "keycloak-angular";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  keycloakService: KeycloakService = inject(KeycloakService);
  cryptoService : CryptoService = inject(CryptoService);
  cryptocurrencyRepository: CryptocurrencyRepository = inject(CryptocurrencyRepository);
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Cryptocurrency> = new MatTableDataSource<Cryptocurrency>([]);
  displayedColumns = ['Id', 'Name', 'Symbol', 'Current Price', 'Editar', 'Borrar'];
  cryptos$ = this.cryptocurrencyRepository.cryptos$;
  isLoading$ = this.cryptocurrencyRepository.getUIState().loading;
  maxSize : number = 0;

  constructor(public dialog: MatDialog) {
  }


  ngOnInit() {

    this.cryptocurrencyRepository.setUIState(true, null);
    setTimeout(() => {
      this.cryptoService.getCryptocurrencies(0, 5).subscribe();
    }, 600);
    this.cryptos$
      .subscribe((response) => {
        const currencyProps = this.cryptocurrencyRepository.getCurrencyProps();
        const isLoading = this.cryptocurrencyRepository.getUIState().loading;
        this.maxSize = Number(currencyProps.totalElements);
        this.dataSource.data =  response;
        this.isLoading$ = isLoading;
      });

  }
  pageChangeEvent($event: PageEvent) {
    this.cryptoService.getCryptocurrencies($event.pageIndex, 5).subscribe();
  }

  addCryptoCurrencyDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {tittle: "Agregar Criptomoneda",
        type: "add"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        setTimeout(() => {
          this.cryptoService.addCryptoCurrency(result);
        }, 400);
      }
    });
  }

  updateCryptoPrice(id: number){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {tittle: "Editar Criptomoneda",
        type: "edit" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        setTimeout(() => {
          this.cryptoService.updateCryptoCurrency(id, Number(result));
          this.cryptos$.subscribe((response) => {
            this.dataSource.data =  response;
          });

        }, 400);
      }
    });

  }

  deleteCryptoCurrency(id: number){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: {tittle: "Eliminar Criptomoneda",
        type: "delete",
        name: this.dataSource.data.find((crypto) => crypto.id === id)?.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        setTimeout(() => {
          this.cryptoService.deleteCryptoCurrency(id);
          this.cryptos$.subscribe((response) => {
            this.dataSource.data =  response;
            console.log(response);
          });

        }, 400);
      }
    });
  }









}
