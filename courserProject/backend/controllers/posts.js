const express = require('express');
const router  = express.Router();
const Post = require('../models/post');
const cheackAuth = require('../middleware/cheack-auth');
const upload= require('../middleware/multer-middleware');



exports.getposts = (req,res,next)=>{

  const pageSize = +(req.query.pageSize);
  const currentPage = +(req.query.currentPage);
  const postQuery = Post.find();
  let fachedPost ;

  if(pageSize&&currentPage){
    postQuery.skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }

  postQuery.then((document)=>{

    fachedPost = document;
    return Post.countDocuments();
  }).then((count)=>{
    res.status(200).json({postNumber:count,posts:fachedPost});
  })
  .catch((e)=>{
    console.log(e);
  })
}



exports.getpost = (req,res,next)=>{
  Post.findOne({_id:req.params._id}).then((documents)=>{
    res.status(200).json({post:documents});
  })
  .catch((e)=>{
    console.log(e);
  })
}


exports.savePost = (req,res,next)=>{

  // console.log(req.file.filename);

  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image: url + "/images/" + req.file.filename,
    creator:req.userData.userId
  });
  console.log(req.userData);
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      msg: 'succefully added '
    });
  }).catch((r)=>{console.log(r)});

}


exports.deletePost = (req,res,next)=>{



  Post.deleteOne({_id:req.params._id, creator:req.userData.userId})
    .then((r)=>{

      if(r.n>0){
        res.status(201).json({
        msg: 'succefully  deleted '})
      }
      else{
        res.status(201).json({
        msg: 'failed to  delete '})
    }

    })
    .catch((e)=>{
      console.log(e);
    });
  }



  exports.editPost = (req,res,next)=>{


    let imagePath= req.body.image;
      if (req.file) {
        imagePath = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename
      }

    const post= new Post({
      _id:req.params._id,
      title :req.body.title,
      content : req.body.content,
      image: imagePath,
    });
    Post.updateOne({_id:req.params._id, creator:req.userData.userId},post)
    .then((r)=>{

      if(r.nModified>0){
        res.status(201).json({
        msg: 'succefully  updated '})
      }
      else{
        res.status(201).json({
          msg: 'failed to  updated '})
    }

  }).catch((e)=>{
      console.log(e);
    });
  }
