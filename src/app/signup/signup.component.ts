import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,}$/)]]
    });
  }

  ngOnInit() {
    // Initialize component
  }

  signUp() {
    if (this.signupForm.invalid) {
      // Mark all form controls as touched to display validation errors
      Object.values(this.signupForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const newUser = {
      userName: this.signupForm.value.name,
      userEmail: this.signupForm.value.email,
      userMobile: this.signupForm.value.mobile,
      userPassword: btoa(this.signupForm.value.password)
    };

    // Send the new user data to the server
    this.http.post<any>('http://localhost:3000/signupusers', newUser)
      .subscribe(
        (response) => {
          // Handle successful signup response
          console.log(response);
          const confirmNavigation = window.confirm('Signup successful! Click OK to navigate to the login page.');
          if (confirmNavigation) {
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          // Handle signup error
          console.error(error);
        }
      );
  }
}

