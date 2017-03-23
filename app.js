var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});

app.get("/api/v1", function(req, res){
    var query = req.query.search;
    var url2 = "http://omdbapi.com/?s=" + query;
    request(url2, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started!!!");
});