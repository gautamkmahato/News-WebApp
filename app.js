if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


//setting middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use(express.json());

app.get('/', async (req, res) => {

    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.API_KEY}`;

    try{
        await fetch(url)
        .then((data) => data.json())
        .then((data) => {
            res.render('home', {
                data: data
                // source: data.articles[0].source,
                // author: data.articles[0].author,
                // title: data.articles[0].title,
                // description: data.articles[0].description,
                // url: data.articles[0].url,
                // image: data.articles[0].urlToImage,
                // publishedAt: data.articles[0].publishedAt,
                // content: data.articles[0].content
            })
            //console.log(data.articles[0])
        });
    }
    catch(err){
        console.log(err);
    }
    
});


app.listen('3000', function(){
    console.log("server running on port 3000...");
});