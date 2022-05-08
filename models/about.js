const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
    description: String
});

module.exports = mongoose.model('AboutMe', AboutSchema);