import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
})
export class PaymentDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
