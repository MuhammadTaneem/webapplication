import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient} from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {environment} from '../environments/environment';

const BACKEND_URL = environment.apiUrl+'posts/';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts:Post[]=[];
  // post:Post;


  updatedPost = new Subject<{posts:Post[],postNumber:number}>();
  constructor(private http:HttpClient,
     private router:Router,
     private route:ActivatedRoute,
     private snackBar:MatSnackBar) {}


  // get all posts
  getPosts(pageSize :number, currentPage:number){

    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    this.http.get<{posts:Post[],postNumber:number}>(BACKEND_URL+queryParams)
    .subscribe((postData)=>{
      this.posts = postData.posts;
      this.updatedPost.next({posts:[...this.posts],postNumber:postData.postNumber});
      // this.refresh();
    });
  }

// get one post
getPost(_id:string){

  return this.http.get<{post:Post}>(BACKEND_URL+_id);

}


openSnackBar(msg){

  this.snackBar.open(msg,'Dismis',{duration : 3000});
}

  //  save a new item  in database
  addPost(p:Post){
     const postForm =new FormData();

     postForm.append("title",p.title);
     postForm.append("content",p.content);
     postForm.append("image",p.image,p.title);


    this.http.post<{msg:string}>(BACKEND_URL,postForm)
    .subscribe((postData)=>{
      this.openSnackBar(postData.msg);
      this.refresh();

    });

  }


  // delete post

  deletePost(_id:string){
    this.http.delete<{msg:string}>(BACKEND_URL+_id).subscribe((postData)=>{
      this.openSnackBar(postData.msg);
    this.refresh();
  })
}


// eded post

editPost(post:Post){

  let postData: Post | FormData;
    if (typeof post.image === "object") {
      postData=new FormData();
      postData.append("title",post.title);
      postData.append("content",post.content);
      postData.append("image",post.image,post.title);
      postData.append("creator",post.creator);
    }
    else{
      postData= post;
    }
  this.http.put<{msg:string}>(BACKEND_URL+post._id,postData)
  .subscribe((postData)=>{
    this.openSnackBar(postData.msg);
    this.router.navigate(['/']);

})
}

// subscribe for posts
PostTracking(){
  return this.updatedPost.asObservable();
}

// refresh page
refresh(){
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
}
}
