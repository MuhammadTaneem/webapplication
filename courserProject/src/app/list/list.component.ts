import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy{
   posts:Post[]=[];
   private postSub:any;
   public isLoading = false;
   public isAuthenticated= false;
   public length=10;
   public pageSize=2;
   public pageSizeOptions=[2,5, 10, 20];
   public currentPage=1;
   public tokenSubject:any;
   public haveToken= false;
   public userId :string;


  constructor(private postService:PostService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.getPosts();
    this.authCheack()
  }


  authCheack(){
    this.isAuthenticated = this.authService.authenticationStatus();
    this.userId = this.authService.getUserId();
    // console.log(this.userId);
    this.tokenSubject = this.authService.haveTokenLisenter().subscribe((auth:boolean)=>{
      this.haveToken = auth;
    });
  }


  onChangePage(pageData:PageEvent){

    this.currentPage = pageData.pageIndex+1;
    this.pageSize = pageData.pageSize;
    this.postService.getPosts(this.pageSize,this.currentPage);


  }

  getPosts(){
    this.isLoading = true;
  this.postService.getPosts(this.pageSize,this.currentPage);
  this.postSub = this.postService.PostTracking().subscribe((arg:{posts:Post[],postNumber:number}) =>{
     this.posts = arg.posts, this.length = arg.postNumber});
  this.isLoading = false;
  }




  onDelete(_id:string){
    this.isLoading =true;
    this.postService.deletePost(_id);
    this.isLoading = false;
  }


  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.tokenSubject.unsubscribe();
  }

}
