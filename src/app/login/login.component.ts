import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail = 'movie@gmail.com';
  userPassword = 'pass';
  isLoggedIn = false;

  public loginForm!: FormGroup;
  signupUsers: any;

  constructor(private router: Router, private loginService: LoginService, private http: HttpClient, private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['']
    });

    this.fetchSignupUsers();
    this.loginService.getloginResponse();
  }

  fetchSignupUsers(): void {
    this.http.get<any>('http://localhost:3000/signupusers').subscribe(
      (response: any) => {
        this.signupUsers = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  loginUser(): void {
    const emailInput = (<HTMLInputElement>document.getElementById('uname')).value.trim();
    const passInput = (<HTMLInputElement>document.getElementById('pwd')).value.trim();
    const emailFormat = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$';

    if (!emailInput.match(emailFormat)) {
      alert('Please enter a valid email!');
    } else if (passInput === '') {
      alert('Password field cannot be empty!');
    } else {
      const foundUser = this.signupUsers.find((user: any) => {
        return user.userEmail === emailInput && user.userPassword === btoa(passInput);
      });

      if (foundUser) {
        this.isLoggedIn = true;
        sessionStorage.setItem('encryptedPwd', btoa(passInput));
        this.loginService.setLoginStatus(true);
        this.router.navigate(['/home']);
      } else {
        alert('Invalid email or password!');
      }
    }
  }

  logoutUser(): void {
    this.isLoggedIn = false;
    this.loginService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }
}
