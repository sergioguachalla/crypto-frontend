import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TransactionService} from "../../services/transaction.service";
import {FormBuilder} from "@angular/forms";
import {CryptoService} from "../../services/crypto.service";

@Component({
  selector: 'app-buy-sell-dialog',
  templateUrl: './buy-sell-dialog.component.html',
  styleUrls: ['./buy-sell-dialog.component.css']
})
export class BuySellDialogComponent {
  amount: number = 0;
  cryptoService: CryptoService = inject(CryptoService);
  cryptoList: String[] = [];

  transactionType: String = "";
  title: String ="";
  transactionService: TransactionService = inject(TransactionService);
  constructor(public dialogRef: MatDialogRef<BuySellDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              ) { }



  onClose(){
    this.dialogRef.close();
  }

  onSave(){
    this.data.amount = this.amount;
    this.dialogRef.close(this.data);
  }


}

export interface DialogData {
  tittle: "Vender" | "Comprar";
  type: "SELL" | "BUY";
  amount: number;
}
