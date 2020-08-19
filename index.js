const request = require("request");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs")

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000

const { Scraper, Root, DownloadContent, OpenLinks, CollectContent } = require('nodejs-web-scraper');

 
var temp = fs.readFileSync("./articles.json");

let array = [];

var snap=JSON.parse(temp)

snap.map(el =>{
  // console.log(el)
  if (el.title) {
    var a = el.title;
    var b = el.price;
    var c = el.rating;
    var d = el.discount;
    var e = el.image;
    for (var i = 0; i < a.length; i++) {
      array.push([a[i],b[i],c[i],d[i],e[i]])
    }
  }
})


app.get("/snapdeal",(req,res)=>{
res.json(array)
})

app.listen(port, () => {
  console.log("server Running");
});


