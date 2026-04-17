var express = require("express");
var app = express();
var fs = require("fs");
var cors = require("cors");
app.use(cors());
app.set("view engine", "pug");

app.get("/home/:fullname", (req, res) => {
  res.render("index", { fullname: req.params.fullname });
});


app.get("/movies{/:startingIdx}{/:perPage}", (req, res) => {
  var startingIdx = +req.params.startingIdx || 0;
  var perPage = +req.params.perPage || 10;
  var fd = fs.readFileSync("movies.json").toString();
  var movies = JSON.parse(fd).slice(startingIdx, startingIdx + perPage);
  //console.log("fd:",JSON.parse(fd).slice(startingIdx, startingIdx + perPage))
  res.render("movies", { movies, startingIdx, perPage });
  // res.send(movies);
});


//This API is for fetching movies data from the other project
app.get("/movies-data", (req, res) => {
  var fd = fs.readFileSync("movies.json").toString();
  var movies = JSON.parse(fd);
  console.log("Request received for movies data");
  res.send({movies});
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi : http://localhost:3600/movies");
});