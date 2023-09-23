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
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,){}

  ngOnInit(): void {
    this.tittle = this.dialogRef.componentInstance.data.tittle;
  }
  onClose(){
    this.dialogRef.close();
  }

  onSave(){
    this.dialogRef.close(this.cryptoName);
  }


}
export interface DialogData {
  tittle: String;
}
