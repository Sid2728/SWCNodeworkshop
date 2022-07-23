//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const {
  Blog,
  User
} = require("./models/user-models");



const app = express();

app.set('view engine', 'ejs');
const dbURI = 'mongodb+srv://siddhant:1q2w3e4r5t6y@cluster0.jdd3w.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(result => console.log("connected to mongodb"))



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("signup")
})



app.post("/", function (req, res) {
  const userdata = new User({
    username: req.body.name,
    password: req.body.password,
  });
  User.findOne({
      username: req.body.name,
      password: req.body.password
    })
    .then((currentUser) => {
      if (currentUser) {
   
        res.redirect("/login")
      } else {
        userdata.save();
        res.redirect("/home")

      }
    })
})


app.get("/login", async (req, res) => {
  res.render("login")
})

app.post("/login", async function (req, res) {
   const userExists=await User.exists({
  username:req.body.name,
  password:req.body.password
})
 
  if (userExists) {
  
    res.redirect("/home")
  } 
else{
res.redirect("/")
}

})


app.get("/home", function (req, res) {
  Blog.find()
    .then((result) => res.render("home", {
      blogs: result
    }))

})



app.get("/compose", function (req, res) {
  res.render("compose")
})

app.post("/compose", async function (req, res) {
  const article = new Blog({
    author: req.body.Author,
    title: req.body.title,
    content: req.body.blog
  })
  await article.save()

  res.redirect("/home");
})



app.get('/home/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/home')
  })

})


app.get("/edit/:id",async (req,res)=>{
  const blog= await Blog.findByIdAndRemove(req.params.id);
  res.render("edit",{
    blogs:blog
  })

 
  
})
app.post("/edit/:id", async(req,res)=>{
  const article =  new Blog({
    author: req.body.Author,
    title: req.body.title,
    content: req.body.blog
  })
  await article.save()

  res.redirect("/home")

})






app.listen(process.env.PORT || 3000 , function () {
  console.log("Server started on port 3000");
});
