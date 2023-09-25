import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CryptoService} from "../../services/crypto.service";
import {Cryptocurrency} from "../../model/cryptocurrency";
import {ApiResponse} from "../../model/paginator";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css']
})
export class TransactionDialogComponent {
  id: number = 0;
  cryptoNames: string[] = [];
  selected: string = '';
  type: string = '';
  amount: number = 0;
  cryptoService: CryptoService = inject(CryptoService)

  constructor(public dialogRef: MatDialogRef<TransactionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getCryptocurrencies();

  }
  onSubmit(){
    const datePipe = new DatePipe('en-US');

    const formattedDate = datePipe.transform(new Date(), 'dd-MM-yyyy');
    this.dialogRef.close({type: this.type, amount: this.amount, selected: this.selected,
      id: this.id+1, date: formattedDate});

  }

  onCancel(){
    this.dialogRef.close();
  }

  getCryptocurrencies() {
    this.cryptoService.getAllCryptocurrencies().subscribe(
      (cryptocurrencies: string[]) => {
        this.cryptoNames = cryptocurrencies;
      },
      error => {
        console.error('Error al obtener criptomonedas', error);
      }
    );
  }
}
