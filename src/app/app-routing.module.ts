import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TicketDetailsComponent } from './ticketdetails/ticketdetails.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path: 'signup', component: SignupComponent },
  {path:'home',component:HomeComponent},
  {path:'movies',component:MoviesComponent},
  {path:'contact',component:ContactComponent},
  {path:'booking',component:BookingComponent},
  {path:'payment',component:PaymentComponent},
  {path:'review',component:ReviewComponent},
  {path:'ticketdetails',component:TicketDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
