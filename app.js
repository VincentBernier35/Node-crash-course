
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');





// express app
const app = express();


// connect to mongoDB
const dbURI =  'mongodb+srv://Vincent:Coucou223511@cluster0.jbqrn.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);


//Middleware & static file 

app.use(express.static('public'));
app.use(morgan('dev'));


app.get('/', (req, res, next) => {
const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'lorem ipsum dolor sit amet consectetur'},
];
    res.render('index', { title: "home", blogs});
});


app.get('/about', (req, res) => {
    res.render('about', { title: "about"});
});


app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create a new blog"});
});


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404"});
});