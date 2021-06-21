import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [

  { path: '',   redirectTo: 'list', pathMatch: 'full' },
  { path: 'create', component:CreatePostComponent ,canActivate:[AuthGuard]},
  { path: 'edit/:_id', component:CreatePostComponent ,canActivate:[AuthGuard]},
  { path: 'list', component: ListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signUp', component: SignupComponent},


  { path: '**', redirectTo:'list'}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
