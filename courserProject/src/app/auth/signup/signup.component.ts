import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Signup } from '../signUp.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public hide = true;


  signUpForm = new FormGroup({
    // firstName: new FormControl('', [ Validators.required, Validators.minLength(4)]),
    // lastName: new FormControl('', [ Validators.required, Validators.minLength(4)]),
    // gender: new FormControl('', [ Validators.required]),
    // birthDay: new FormControl('', [ Validators.required]),


    email: new FormControl('', [ Validators.required, Validators.minLength(4),Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(4)]),
  });



  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(){
    if(this.signUpForm.invalid){
      return;
    }


    const userData:Signup = {
      _id : '',
      email : this.signUpForm.value.email,
      password : this.signUpForm.value.password
    };
    this.authService.creatUser(userData);
    this.signUpForm.reset();

  }

}
