import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketDetailsComponent implements OnInit {
  moviename: string | null = null;
  datee: any 
  timing: any 
  seat: any;
  price: any;

  constructor() {}

  ngOnInit() {
    this.moviename = sessionStorage.getItem('moviename');
    this.datee = sessionStorage.getItem('datee');
    this.timing = sessionStorage.getItem('timing');
    this.seat = sessionStorage.getItem('selectedSeats');
    this.price = sessionStorage.getItem('totalPrice');
  }

  generateInvoice() {
    const doc = new jsPDF();

      const content = [
        'Movie Ticket Invoice',
        'Movie Title: ' + this.moviename,
        'Date: ' + this.datee,
        'Showtime: ' + this.timing,
        'totalPrice: ' + this.price,

      ];
      doc.text(content, 10, 10);

      const blob = doc.output('blob');

      saveAs(blob, 'ticket.pdf');
  }
}
