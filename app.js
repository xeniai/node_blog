const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Tourground = require('./models/tourground');
const { truncate } = require("fs");
const mongoSanitize = require('express-mongo-sanitize');
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB Connection error:"));
db.once("open", () => {
    console.log("MongoDB is connected :)")
});

const app = express();
const port = process.env.PORT || 3000

app.use(mongoSanitize());
app.use('/images', express.static('images'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async(req, res) => {
    const tourgrounds = await Tourground.find({});
    res.render('home', {tourgrounds})
})

app.get('/about', async(req, res) => {
    res.render('about')
})

app.get('/tourgrounds/:id', async(req, res) => {
    const tourground = await Tourground.findById(req.params.id);
    res.render('tourgrounds/show', {tourground})
})

app.listen(port, () =>{
    console.log(`Blog Web API Server is up on port ${port}!`)
})
