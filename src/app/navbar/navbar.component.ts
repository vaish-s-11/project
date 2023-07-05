import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  get isLoggedIn(): boolean {
    return this.loginService.getLoginStatus();
  }

  logoutUser(): void {
    this.loginService.setLoginStatus(false);
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
