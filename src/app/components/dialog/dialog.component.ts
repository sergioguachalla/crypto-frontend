import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

// @ts-ignore
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {

  cryptoName: String = "";
  tittle: String ="";
  type: String = "";
  name: String = "";
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,){}

  ngOnInit(): void {
    this.tittle = this.dialogRef.componentInstance.data.tittle;
    this.type = this.dialogRef.componentInstance.data.type;
    this.name = this.dialogRef.componentInstance.data.name;
  }
  onClose(){
    this.dialogRef.close();
  }

  onSave(){
    this.dialogRef.close(this.cryptoName);
  }


}
export interface DialogData {
  tittle: "Agregar Criptomoneda" | "Editar Criptomoneda" | "Eliminar Criptomoneda";
  type: "add" | "edit" | "delete";
  name: String;
}
