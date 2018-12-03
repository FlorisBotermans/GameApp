const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Character = mongoose.model('character', CharacterSchema);

module.exports = Character;