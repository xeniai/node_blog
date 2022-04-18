const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourgroundSchema = new Schema({
    created: {type: Date, default: Date.now},
    title: String,
    location: String, 
    image: String,
    description: String,
    description1: String,
    description2: String,
    imageBy: String,
    imageLink: String
});

module.exports = mongoose.model('Tourground', TourgroundSchema);