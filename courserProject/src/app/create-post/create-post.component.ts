import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

   isLoading = false;
  public editMode = false;
  public postId:string|any;
  public post:Post|any;
  public userId:string;
  constructor(private postService:PostService, public route:ActivatedRoute) { }


  postFrom = new FormGroup({
    title: new FormControl('', [ Validators.required, Validators.minLength(4)]),
    content: new FormControl('', [ Validators.required, Validators.minLength(4)]),
    image: new FormControl('', [ Validators.required]),
  });

  ngOnInit(): void {
    this.editFuntion();
  }

  editFuntion(){
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('_id')){
        this.editMode = true;
        this.isLoading = true;
        this.postId = paramMap.get('_id');
        this.postService.getPost(this.postId)
        .subscribe((postData)=>{
          this.post = postData.post;
          this.userId = postData.post.creator;
          this.isLoading = false;


          this.postFrom.setValue({
            title: this.post.title,
            content: this.post.content,
            image: this.post.image
          });

          this.imagePreview = this.post.image;

        });




      }
      else{
        this.editMode= false;
      }
    });
  }


  public  imagePreview: string;

  pickImage(event){

    const file = (event.target as HTMLInputElement).files[0];
    // this.postFrom.controls.image.setValue(file);
    this.postFrom.patchValue({ image: file });
    this.postFrom.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }




  p:Post={_id:' ',title:' ',content:' ',image:' ',creator:''}
  onSubmit(){
    this.isLoading= true;
    this.p.title = this.postFrom.value.title;
    this.p.content = this.postFrom.value.content;
    this.p.image = this.postFrom.value.image;



      if(this.editMode){
        this.p._id = this.postId;
        this.p.creator = this.userId;
        this.postService.editPost(this.p);

      }
      else{
        this.postService.addPost(this.p);
      }
      this.imagePreview = null;
      this.postFrom.reset();
      this.isLoading = false;

  }


}
