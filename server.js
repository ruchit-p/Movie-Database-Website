const express = require("express");
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Set strictQuery to true to silence the deprecation warning
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  w: 'majority',
  wtimeoutMS: 5000
});

const moviesSchema = {
    title: String,
    genre: String,
    year: String
};

const movieModel = mongoose.model("Movie", moviesSchema);

app.get('/', (req, res) => {
    movieModel.find({}, function(err, movies){
        res.render('index', {
            moviesList: movies
        });
    });
});

app.post('/', function(req, res){
    let newMovie = new movieModel({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    });
    newMovie.save();
    res.redirect('/');
});

app.listen('3000', function() {
    console.log("server is running");
});
