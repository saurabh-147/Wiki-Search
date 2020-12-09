const express = require('express');
const request = require('request');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.use(express.static("public"));


let pagesName = [];
let pagesLink = [];

app.get("/",function(req,res){
  res.render("home",{names : pagesName , links : pagesLink});
});


app.post("/search",function(req,res){
    const query = req.body.query;
    options = {
      url :" https://en.wikipedia.org/w/api.php?",
      method : "GET",
      qs : {
        origin : '*',
        action : "opensearch",
        search : query
      }
    };
    request(options,function(error,response,body){
      if(error){
        console.log(error);
      }else{
        const data = JSON.parse(body);
        pagesName = Object.values(data[1]);
        pagesLink = Object.values(data[3]);
        res.redirect("/");

      }
    });
});

app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000 || process.env.PORT,function(req,res){
  console.log("Server Started at port 3000");
});
