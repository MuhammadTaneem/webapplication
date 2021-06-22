const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/posts');
const path = require("path");
const  mongoose  = require("mongoose");

// eYQ8JMQoBsiofDtQ
const databaseUrl ='mongodb+srv://Taneem:'+process.env.MONGO_ATLAS_PW+'@posts.eikg0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(databaseUrl, { useNewUrlParser: true,  useUnifiedTopology: true })
.then((a)=>{
  console.log("connented to database");
})
.catch((e)=>{
  console.log("connetion Faill"+e);
});



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/images", express.static(path.join("backend/images")));

// home page



app.get('/',(req,res,next)=>{
  res.send("hello from backend server");
});

app.use('/api/user',userRoutes);
app.use('/api/posts',postRoutes);
module.exports  = app;
