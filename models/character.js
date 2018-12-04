const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = CharacterSchema;