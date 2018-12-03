const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    developers: [{ type: Schema.Types.ObjectId, ref: 'developer' }],
    characters: [{ type: Schema.Types.ObjectId, ref: 'character' }]
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;