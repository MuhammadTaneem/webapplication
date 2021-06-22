import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Signup} from'./signUp.model'
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl+'user/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private token :string;
  haveToken= new Subject<boolean>();
  isAuthenticated = false;
  tokenTimer :any;
  userId:string;

  constructor(private http: HttpClient, private router:Router, private snackBar:MatSnackBar) {}
  getToken(){
    return this.token;
  }

  getUserId(){
    return this.userId;
  }

  authenticationStatus(){
    return this.isAuthenticated;
  }

  haveTokenLisenter(){
    return this.haveToken.asObservable();
  }

  creatUser(user:Signup){
    this.http.post<{msg:string}>(BACKEND_URL+'signup',user)
    .subscribe((userData)=>{
      console.log(userData.msg);
      this.openSnackBar(userData.msg);
      this.router.navigate(['/create']);
    }),error=>{
      console.log('error coming'+error);
    };
  }



  login(email:string, password:string){

    const user={
      email:email,
      password:password
    }
    this.http.post<{msg:string,token:string,expiresIn:number,userId:string}>(BACKEND_URL+'login',user)
    .subscribe((userData)=>{
      // console.log(userData.msg);
      const token = userData.token;
      this.token = token;
      if(token){
        const tokenTimeDuration= userData.expiresIn;
        this.setAuthTimer(tokenTimeDuration);
        this.isAuthenticated = true;
        const userId = userData.userId
        this.userId = userId;
        this.haveToken.next(true);
        const now = new Date();
       const expirationDate = new Date(now.getTime() + tokenTimeDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate,userId);
         this.router.navigate(['/create']);
         this.openSnackBar("Succesfully login");
        // console.log(this.token);
      }



    });
  }



  openSnackBar(msg){

    this.snackBar.open(msg,'Dismis',{duration : 1000});
  }

  logOut(){

    clearTimeout(this.tokenTimer);
    this.isAuthenticated = false;
    this.token = null;
    this.userId = null;
    this.clearAuthData();
    this.haveToken.next(false);
    this.router.navigate(['/list']);
    this.openSnackBar("Succesfully Logout");


  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.userId = authInformation.userId;
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.haveToken.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date,userId:string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userId",userId);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiration");
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }



  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return false;
    }
    return {
      token: token,
      userId:userId,
      expirationDate: new Date(expirationDate)
    }
  }



}


