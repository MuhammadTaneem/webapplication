const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


exports.createUser = (req,res,next)=>{

  bcrypt.hash(req.body.password,10)
  .then(hash=>{
     const user = new User({
       email: req.body.email,
       password:hash
     });

     user.save().then(createdUser => {
      // console.log(createdUser);
      res.status(201).json({
        msg: 'succefully account created '});

       })
      .catch(err => {
           res.json({
          msg : 'account creation faild'
        });

      });
  })
}



exports.login =  (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        msg:'succesfully login'
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
}
