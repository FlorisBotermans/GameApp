const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Developer = mongoose.model('developer', DeveloperSchema);

module.exports = Developer;