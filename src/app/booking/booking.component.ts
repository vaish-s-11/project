import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { TestService } from '../test.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @ViewChild('toggleGroupA') toggleGroupA: any;
  @ViewChild('toggleGroupB') toggleGroupB: any;
  @ViewChild('toggleGroupC') toggleGroupC: any;
  @ViewChild('toggleGroupD') toggleGroupD: any;
  @ViewChild('toggleGroupE') toggleGroupE: any;
  @ViewChild('toggleGroupF') toggleGroupF: any;
  @ViewChild('toggleGroupG') toggleGroupG: any;
  @ViewChild('toggleGroupH') toggleGroupH: any;
  
  sev: any;
  movie: any;
  moviename: any;
  datee: any;
  timing: any;
  seat: any;
  selectedVal: string ='';
  selectedTime: string = '';
  selectedDate: Date;

  minDate: Date;
  maxDate: Date;
  selectedGroup: any;
  theatre: void;
  showTheatre: any;
  price: any;
  totalPrice: string = '';
  selectedSeats: string='';



  constructor(private router: Router, private service: TestService, private http: HttpClient) {  const currentDate = new Date();
    this.minDate = currentDate;
    this.maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, currentDate.getDate());
  }

      array = [
        { id: 1, name: 'G3 Sindura' },
        { id: 2, name: 'Kasi Cinemas' },
        { id: 3, name: 'Galaxy cinemas' }
        ]

  @ViewChild('content', { static: false }) el!: ElementRef;

  pa: Boolean = true;
  ticket: Boolean = true;
  down: Boolean = false;

  mindate = new Date();
  dateFilter = (date: Date) => {
    const currentDate = new Date();
    // Disable dates that are in the past
    return date >= currentDate;
  };

  saveSelectedValue(selectedValue: string) {
    const newButtonToggle = { value: selectedValue };
    this.http.post('assets/db.json', newButtonToggle).subscribe(
      () => {
        console.log('Value saved successfully!');
      },
      (error) => {
        console.error('Error saving value:', error);
      }
    );
  }

  saveSelectedTime(selectedTime: string) {
    const newShowTiming = { value: selectedTime };
    this.http.post('assets/db.json', newShowTiming).subscribe(
      () => {
        console.log('Show timing saved successfully!');
      },
      (error) => {
        console.error('Error saving show timing:', error);
      }
    );
  }

  saveButtonToggleValues(groupName: string, selectedValues: string[]) {
    const groupData = { [groupName]: selectedValues };
    this.http.post('assets/db.json', groupData).subscribe(
      () => {
        console.log(`Button toggle values for ${groupName} saved successfully!`);
      },
      (error) => {
        console.error(`Error saving button toggle values for ${groupName}:`, error);
      }
    );
  }
  
  

  ngOnInit(): void {

    console.log(this.service.variable1);
    this.selectedVal ='';
    this.moviename = this.service.variable1;
  }

  getcompanyid(data) {
    this.showTheatre = true;
    this.theatre = data.target.value;
    console.log(data.target.value);
  }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    // Do something with the selected date
  }
  
  seats(arg0: string, selectedSeats: any) {
    this.seat = selectedSeats;
    console.log(this.selectedSeats,'selectedSeats'); 
  }

  getTimeLabel(selectedTime: string): string {
    switch (selectedTime) {
      case 'morning':
        return ' (9:30AM - 12:30PM)';
      case 'afternoon':
        return ' (1:00PM - 4:00PM)';
      case '':
        return ' (4:30PM - 7:30PM)';
      case 'night':
        return '(8:00PM - 11:00PM)';
      default:
        return '';
    }
  }
  

  prices(arg0: string, totalPrice: any) {
    this.price = totalPrice;
    console.log(this.totalPrice,'totalPrice');

  }

  date(arg0: string, selectedDate: any) {
    this.datee = selectedDate;
  }

  show: Boolean = false;
  showw: Boolean = false;
  showe: Boolean = false;
  shown: Boolean = false;

  theater1() {
    if (this.show == false) {
      this.show = true;
    } else {
      this.show = false;
    }
  }


  theater2() {
    if (this.showw == false) {
      this.showw = true;
    } else {
      this.showw = false;
    }
  }  
  td() {
     this.router.navigate(['ticketdetails']);
  }    

  theater3() {
    if (this.showe == false) {
      this.showe = true;
    } else {
      this.showe = false;
    }
  }
  theater4() {
    if (this.shown == false) {
      this.shown= true;
    } else {
      this.shown = false;
    }
  }
  onTimeChange(time : string){
  this.selectedTime = time;
  console.log(this.selectedTime);

  }
  pay() {
    this.ticket = false;
    this.pa = true;
    this.show = false;
    this.showw = false;
  }
  
  payy() {
    confirm("confirm Payment");
    this.storeTicketInfoInSessionStorage();
    this.pa = false;
    this.down = true;
    this.router.navigate(['/payment']);
}

  private storeTicketInfoInSessionStorage() {
    sessionStorage.setItem('moviename', this.moviename);
    sessionStorage.setItem('datee',this.selectedVal);
    sessionStorage.setItem('timing',this.selectedTime);
    sessionStorage.setItem('totalPrice', this.price.toString());
    sessionStorage.setItem('selectedSeats', this.seats.toString());
    
  }

  calculatePrice(): void {
    const selectedSeatsA = this.toggleGroupA.value;
    const selectedSeatsB = this.toggleGroupB.value;
    const selectedSeatsC = this.toggleGroupC.value;
    const selectedSeatsD = this.toggleGroupD.value;
    const selectedSeatsE = this.toggleGroupE.value;
    const selectedSeatsF = this.toggleGroupF.value;
    const selectedSeatsG = this.toggleGroupG.value;
    const selectedSeatsH = this.toggleGroupH.value;
  
    const selectedSeats = [
      ...(selectedSeatsA ? selectedSeatsA : []),
      ...(selectedSeatsB ? selectedSeatsB : []),
      ...(selectedSeatsC ? selectedSeatsC : []),
      ...(selectedSeatsD ? selectedSeatsD : []),
      ...(selectedSeatsE ? selectedSeatsE : []),
      ...(selectedSeatsF ? selectedSeatsF : []),
      ...(selectedSeatsG ? selectedSeatsG : []),
      ...(selectedSeatsH ? selectedSeatsH : [])
      
    ];
  
    this.price = selectedSeats.reduce((totalPrice, seat) => {
      const seatInfo = seat.split(':');
      const seatPrice = parseInt(seatInfo[1]);
      return totalPrice + seatPrice;
    }, 0);

    sessionStorage.setItem('price', this.price.toString());
  }  
  
}
