import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ListComponent } from '../list/list.component';
import { CreatePostComponent } from '../create-post/create-post.component';


const im= [
  CommonModule


]

@NgModule({
  declarations: [
    CreatePostComponent,
    ListComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [im],
  exports:[im]
})
export class AngularComphonentModule { }
