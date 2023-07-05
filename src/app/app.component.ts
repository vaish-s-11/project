import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public loginService: LoginService,
    private router: Router
  ) {}

  get isLoggedIn(): boolean {
    return this.loginService.getLoginStatus();
  }

  payy() {
    // Perform payment logic here
    // Assuming payment is successful
    // this.router.navigateByUrl('/payment');
     this.router.navigateByUrl('/ticket-details');
  }

  title = 'book1';
}
