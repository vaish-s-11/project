import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  moviename: string | null = null;
  datee: any;
  timing: any;
  seat: any;
  price: any;
  paymentMethod: string = '';
  cardNumber: string = '';
  cvv: string = '';
  upiLink: string = '';
  expiryDate: string = '';
  posterUrl: SafeUrl | null = null;

  cardNumberPlaceholder: string = 'Enter 16-digit card number';
  cvvPlaceholder: string = 'Enter CVV number';
  upiPlaceholder: string = 'Enter UPI link';
  expiryDatePlaceholder: string = 'MM/YY';

  constructor( private dialog: MatDialog,private router: Router, private sanitizer: DomSanitizer) {
    
  }

  ngOnInit() {
    this.moviename = sessionStorage.getItem('moviename');
    this.datee = sessionStorage.getItem('datee');
    this.timing = sessionStorage.getItem('timing');
    this.seat = sessionStorage.getItem('selectedSeats');
    this.price = sessionStorage.getItem('totalPrice');
    const posterUrl = sessionStorage.getItem('posterUrl');
    if (posterUrl) {
      this.posterUrl = this.sanitizer.bypassSecurityTrustUrl(posterUrl);
    }
  }

  onPaymentMethodChange(event: any) {
    this.paymentMethod = event.target.value;
  }

  formatCardNumber() {
    // Remove existing hyphens from the card number
    this.cardNumber = this.cardNumber.replace(/-/g, '');

    // Add hyphens after every 4 digits
    const formattedNumber = this.cardNumber.replace(/(\d{4})(?=\d)/g, '$1-');
    this.cardNumber = formattedNumber;
  }

  pay() {
    if (this.paymentMethod === '') {
      // Display an error message or handle the case where no payment method is selected
      return;
    }

    // Remove hyphens from the card number before validating
    const cardNumberWithoutHyphens = this.cardNumber.replace(/-/g, '');

    // Validate the card number
    if (cardNumberWithoutHyphens.length !== 16 || !/^\d+$/.test(cardNumberWithoutHyphens)) {
      return;
    }

    switch (this.paymentMethod) {
      case 'credit-card':
        if (this.cvv.length !== 3) {
          return;
        }
        break;
      case 'debit-card':
        // Handle debit card validation or any specific logic
        break;
      case 'upi':
        // Handle UPI validation or any specific logic
        break;
    }

    // Redirect to the payment confirmation page or perform further actions as needed
    // this.router.navigate(['/payment-dialog']);
  }

  openPaymentConfirmationDialog() {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      data: { moviename: this.moviename }, // Pass data to the dialog component
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed (if needed)
    });
  }
  isPaymentFormValid(): boolean {
    if (this.paymentMethod === 'credit-card' || this.paymentMethod === 'debit-card') {
      // Check if card number, CVV, and expiry date are filled in
      return this.cardNumber.trim() !== '' && this.cvv.trim() !== '' && this.expiryDate.trim() !== '';
    } else if (this.paymentMethod === 'upi') {
      // Check if UPI link is filled in
      return this.upiLink.trim() !== '';
    } else {
      return false;
    }
  }
  
}

