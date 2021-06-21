import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  haveToken = false;
  tokenSubject:any;
  isAuthenticated= false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authCheack();
  }


  authCheack(){
    this.isAuthenticated = this.authService.authenticationStatus();
    this.tokenSubject = this.authService.haveTokenLisenter().subscribe((auth:boolean)=>{
      this.haveToken = auth;
      this.isAuthenticated = auth;
    });
  }




  logOut(){
    this.authService.logOut();
  }

  ngOnDestroy():void{
    this.tokenSubject.unsubscribe;
  }

}
