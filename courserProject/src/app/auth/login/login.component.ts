import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logInForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(4)]),
  });

  public hide = true;



  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){



    this.authservice.login(this.logInForm.value.email, this.logInForm.value.password);
      // else{
      //   this.postService.addPost(this.p);
      // }
      // this.imagePreview = null;
      // this.postFrom.reset();
      // this.isLoading = false;

  }

}
