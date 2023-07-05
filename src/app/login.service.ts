// login.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = false;
  private baseUrl = 'http://localhost:3000';
  getloginres: any;
  errorMessage: string;
  loggedIn: boolean;

  constructor(private http: HttpClient,private router: Router) {}

  setLoginStatus(status: boolean): void {
    this.isLoggedIn = status;
  }

  getLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  loginUser(username: string, password: string){
    console.log(this.getloginres)
var test= this.getloginres.some(function(item) {
 
       return item.userEmail === username && item.userPassword === btoa(password);
 
     });
if (test)
 
     {
 this.router.navigateByUrl('/home');
 this.loggedIn = true;
 sessionStorage.setItem('encryptedPwd',btoa(password));
        this.setLoginStatus(true);

 
 } else {this.errorMessage = 'Invalid username or password. Please try again.';
 
     alert(this.errorMessage);
 
     }
    }
 
    
 
  
getloginResponse(){
this.getloginUsers().subscribe(res=>{console.log(res)
this.getloginres=res

    })

  }
  getloginUsers(): Observable<any> {
 return this.http.get(`${this.baseUrl}/loginusers`);
}
}

