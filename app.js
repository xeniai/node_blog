const express = require("express");
const dotenv = require('dotenv');
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const Tourground = require('./models/tourground');
const { truncate } = require("fs");
const mongoSanitize = require('express-mongo-sanitize');
const methodOverride = require('method-override');
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

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
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

app.get('/tourgrounds/mx', async(req, res) => {
    res.render('tourgrounds/mx')
})

app.get('/tourgrounds/:id', async(req, res) => {
    const tourground = await Tourground.findById(req.params.id);
    res.render('tourgrounds/show', {tourground})
})

app.get('/tourgrounds/:id/edit', async(req, res) => {
    const tourground = await Tourground.findById(req.params.id);
    res.render('tourgrounds/edit', {tourground})
})

app.put('/tourgrounds/:id', async(req, res) => {
    const { id } = req.params;
    const tourground = await Tourground.findByIdAndUpdate(id, {...req.body.tourground});
    res.redirect(`/tourgrounds/${tourground._id}`)
})

app.listen(port, () =>{
    console.log(`Blog Web API Server is up on port ${port}!`)
})
