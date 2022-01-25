const express = require("express");
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://ruchitp:Kalpesh1527@test.ns67y.mongodb.net/moviesDB', {useNewUrlParser: true}, {useUnifiedTopology: true});

const moviesSchema = {
    title: String,
    genre: String,
    year: String
}

const movieModel = mongoose.model("Movie", moviesSchema);

app.get('/', (req, res) => {
    movieModel.find({}, function(err, movies){
        res.render('index', {
            moviesList: movies
        })
    })
})

app.post('/', function(req, res){
    let newMovie = movieModel({
        title: req.body.title,
        genre: req.body.genre,
        year: req.body.year
    })
    newMovie.save();
    res.redirect('/');
})

app.listen('3000', function() {
    console.log("server is running")
})