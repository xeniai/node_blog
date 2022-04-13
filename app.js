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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', async(req, res) => {
    const tourgrounds = await Tourground.find({});
    res.render('home', {tourgrounds})
})

app.get('/maketourground', async(req, res) => {
    const tourgrounds = new Tourground({
        created: Date.now(),
        title: "Deep-Sea Coral Reefs For Future Medicines", 
        location : "Nature itself is the best physician. - Hippocrates",
        image: "https://images.unsplash.com/photo-1562742822-4c28ba613567?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=917&q=80",
        description: "Corals are animals that need to be taken care of; a study shows that 14% of the world's corals have already died because of climate change, which leads to coral bleaching. And it is predicted that more than 90% of the world's coral will die by 2050. Coral bleaching happens when corals dispossess the microscopic algae zooxanthellae that live within and build the vibrant colors of corals. When corals are stressed, because of the high temperature, it expels the algae and never lets it come back; which causes it to fade and die. (https://www.worldwildlife.org/pages/everything-you-need-to-know-about-coral-bleaching-and-how-we-can-stop-it) Why do we need to care?",
        description1: "\"1 Over half a billion people depend on reefs for food, income, and protection. Coral reefs protect coastlines from the damaging effects of wave action, tropical storms, and erosion. 2 It provides jobs for local communities, and offers recreation opportunities.  3 It provides habitats and shelter for many marine organisms. They are the source of nitrogen and other essential nutrients for marine food chains that assist in carbon and nitrogen-fixing.\"",
        description2: "They are also a source of food and new medicines. According to Sam Afoullouss, they might even cure cancer. (https://www.ted.com/talks/sam_afoullouss_the_deep_sea_s_medicinal_secrets). Another exploration from Nishan Degnarain states that \"A protein from an ocean seabed algae found among coral reefs was revealed to show activity against another coronavirus known as Middle East Respiratory Syndrome or MERS. This marine compound griffithsin was extracted from the red algae Griffithsia that is native to coral reefs around the Canary Islands and identified in 2016 to be a potential inhibitor to the MERS coronavirus. \" This was his insight as of March 2020. He went on to interpret that this is just one of over 40 marine composites that have anti-viral materials and are undergoing pre-clinical and clinical trials around the world. These are all promising. One way or another, we should try to maintain everything in a sustainable way taking care of our ecosystem, our healer.  Namaste."
    });
    await tourgrounds.save();
    res.send(tourgrounds)
})

/*app.get('/tourgrounds/:id', async(req, res) => {
    const tourground = await Tourground.findById(req.params.id);
    res.render('tourgrounds/show', {tourground})
})*/

app.listen(port, () =>{
    console.log(`Blog Web API Server is up on port ${port}!`)
})
