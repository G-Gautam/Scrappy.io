const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let placesSchema = new Schema({
    username: {type: String},
});
// Export the model
module.exports = mongoose.model('gmaps', placesSchema);