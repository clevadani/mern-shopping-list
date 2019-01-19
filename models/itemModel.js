const mongoose = require('mongoose');


const ItemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  finished: { type: Boolean, default: false},
  date: { type: Date, default: Date.now }
});

module.exports = Item = mongoose.model('Item', ItemSchema);