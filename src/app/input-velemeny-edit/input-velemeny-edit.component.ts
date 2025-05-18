import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog, MatDialogModule  } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-input-velemeny-edit',
  imports: [MatDialogModule,MatInputModule,FormsModule],
  templateUrl: './input-velemeny-edit.component.html',
  styleUrl: './input-velemeny-edit.component.scss'
})
export class InputVelemenyEditComponent {

  inputText ='' 
  constructor(
    public dialogRef: MatDialogRef<InputVelemenyEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; inputText: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.data.inputText); // Visszaküldjük az adatot
  }
}


