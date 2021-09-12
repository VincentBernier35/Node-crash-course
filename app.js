const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');



// express app
const app = express();




//register view engine
app.set('view engine', 'ejs');

// midlewares & static files
app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose &mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });

    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
})





//routes
// home page / blog page
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consctetur'},
        {title: 'Mario finds stars', snippet: 'lorem ipsum dolor sit amet consctetur'},
        {title: 'How to defeat bowser', snippet: 'lorem ipsum dolor sit amet consctetur'},
    ];
    res.render('index', { title: 'home', blogs});
});

// about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'about'});
});


// create page / new post
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'create a new blog'} );
});


//404 pages
app.use((req, res) => {
     res.status(404).render('404', { title: '404'});
});