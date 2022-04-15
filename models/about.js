const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    location: String, 
    image: String,
    description: String,
});

module.exports = mongoose.model('About', AboutSchema);