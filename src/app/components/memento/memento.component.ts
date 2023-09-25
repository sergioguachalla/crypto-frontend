import {Component, inject} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TransactionDialogComponent} from "../transaction-dialog/transaction-dialog.component";
import {CryptoService} from "../../services/crypto.service";
import {MatTableDataSource} from "@angular/material/table";
import {Transaction} from "../../model/transaction";
import {Memento} from "../../memento/memento";


//Este es el caretaker
@Component({
  selector: 'app-memento',
  templateUrl: './memento.component.html',
  styleUrls: ['./memento.component.css']
})
export class MementoComponent {
  transactions: Transaction[] = [];
  mementos: Memento[] = [new Memento([])];

  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>(this.transactions);
  displayedColumns: string[] = ['Id', 'Cryptocurrency', 'Date', 'Type', 'Amount', 'Price'];
  constructor(public dialog: MatDialog, ) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactions.push(result);

        // Comparamos la lista de transacciones actual con la lista de transacciones del último memento

        const memento = new Memento([...this.transactions]); // Copia independiente de las transacciones
        this.mementos.push(memento);



        // Actualizamos la tabla
        this.updateDataSource(this.transactions);
      }
      console.log(this.mementos);
    });
  }

  updateDataSource(transactions: Transaction[]) {
    this.dataSource = new MatTableDataSource<Transaction>(transactions);
    this.dataSource._updateChangeSubscription();
  }
  restoreState() {
    if (this.mementos.length > 1) {

      const memento = this.mementos[this.mementos.length - 2];
      console.log(memento);
      this.transactions = [...memento.transactions];
      console.log(this.transactions);
      this.updateDataSource(this.transactions);
    }

  }
}
